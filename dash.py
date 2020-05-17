# -*- coding: utf-8 -*-

import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly
import plotly.graph_objs as go
import requests
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from dash.dependencies import Input, Output, State
from datetime import datetime
from flask_caching import Cache
from os import getenv
from time import sleep

default_location = {'lat': 49.172477, 'lon': -123.071298}
creds = { 'X-Auth-Token': getenv('TOKEN', '<snip>') }
mapbox_access_token = getenv('MAPBOX_ACCESS', '<snip>')
company = getenv('COMPANY', '<snip>')
device_update_interval = int(getenv('DEVICE_UPDATE_INTERVAL', '20'))

external_stylesheets = ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

cache = Cache(app.server, config={
    'CACHE_TYPE': 'filesystem',
    'CACHE_DIR': 'cache-directory'
})

def update_devices():
    global devices
    print('update_devices')
    url = 'https://octave-api.sierrawireless.io/v5.0/{}/device/?filter=tags.dashdemo%3D%3D%22true%22'.format(company)
    all_devs = [d for d in requests.get(url, headers=creds).json()['body']]
    for d in all_devs:
        if 'location' not in d.keys():
            d.update(location=default_location)
    devices = all_devs

def update_devices_every(period=device_update_interval):
    while True:
        update_devices()
        sleep(period)

update_devices()
executor = ThreadPoolExecutor(max_workers=1)
executor.submit(update_devices_every)
sleep(2) # make sure devices get loaded

@cache.memoize(timeout=2)
def get_events_for_device_stream(device_name, stream_name):
    url = 'https://octave-api.sierrawireless.io/v5.0/%s/event/?path=/%s/devices/%s/%s' % (company,company, device_name, stream_name)
    return sorted([e for e in requests.get(url, headers=creds).json()['body']], key=lambda x: x['generatedDate'])

def get_gyro_for_device(device_name):
    events = get_events_for_device_stream(device_name, 'gyro2c')

    def scatter_for_dimension(dim):
        return go.Scatter(
            x=[datetime.fromtimestamp(e['generatedDate']/1000.0) for e in events],
            y=[e['elems']['redSensor']['gyro'][dim] for e in events],
            name='Gyro %s' % dim
        )

    return [scatter_for_dimension(i) for i in ['x', 'y', 'z']]

def get_accel_for_device(device_name):
    events = get_events_for_device_stream(device_name, 'accel2c')

    def scatter_for_dimension(dim):
        return go.Scatter(
            x=[datetime.fromtimestamp(e['generatedDate']/1000.0) for e in events],
            y=[e['elems']['redSensor']['accel'][dim] for e in events],
            name='Accel %s' % dim
        )

    return [scatter_for_dimension(i) for i in ['x', 'y', 'z']]


def get_map_data_from_devices():
    return [ dict(
        type = 'scattermapbox',
        lon = [d['location']['lon'] for d in devices],
        lat = [d['location']['lat'] for d in devices],
        text = [d['name'] for d in devices],
        mode = 'markers',
        marker = dict(
            size = 8,
        ))]

def generate_layout():
    return html.Div(children=[
        html.Div(className='row', children=[
            html.Div(className='col-12', children=[
                dcc.Graph(id='live-update-map'),
                dcc.Interval(
                    id='interval-component',
                    interval=10*1000,
                    n_intervals=0
                )
            ]),
        ]),
        html.Div(className='row', children=[
            html.Div(className='col-6', children=[
                dcc.Graph(id='gyro-time-series')
            ]),
            html.Div(className='col-6', children=[
                dcc.Graph(id='accel-time-series')
            ]),
        ])
    ])

app.layout = generate_layout()

@app.callback(
    Output('live-update-map', 'figure'),
    [Input('interval-component', 'n_intervals')],
    [State('live-update-map', 'relayoutData')]
)
def update_location_map(n, mapdata):
    fig = {
        'data': get_map_data_from_devices(),
        'layout': {
            'autosize': True,
            'title': '{} MangOHs tagged with dashdemo: true'.format(company),
            'mapbox': {
                'center': {},
                'accesstoken': mapbox_access_token,
                'center': {
                    'lat': 39.8283,
                    'lon': -98.5795
                },
                'zoom': 2,
            },
            'uirevision': 1
        },
    }

    if not mapdata or 'mapbox.center' not in mapdata.keys(): mapdata = {}
    fig['layout']['mapbox']['center'] = mapdata.get('mapbox.center', { 'lat': 39.8283, 'lon': -98.5795 })
    fig['layout']['mapbox']['zoom'] = mapdata.get('mapbox.zoom', 2)
    fig['layout']['mapbox']['bearing'] = mapdata.get('mapbox.bearing', 0)
    fig['layout']['mapbox']['pitch'] = mapdata.get('mapbox.pitch', 0)
    return fig

@app.callback(
    Output('gyro-time-series', 'figure'),
    [Input('live-update-map', 'hoverData')]
)
def update_gyro(hoverData):
    if not hoverData: return {}
    device_name = hoverData['points'][0]['text']
    gyro_data = get_gyro_for_device(device_name)
    return {
        'data': gyro_data,
        'layout': {
            'title': 'Gyro Data for "%s"' % device_name
        }
    }

@app.callback(
    Output('accel-time-series', 'figure'),
    [Input('live-update-map', 'hoverData')]
)

def update_accel(hoverData):
    if not hoverData: return {}
    device_name = hoverData['points'][0]['text']
    accel_data = get_accel_for_device(device_name)
    return {
        'data': accel_data,
        'layout': {
            'title': 'Accel Data for "%s"' % device_name
        }
    }

if __name__ == '__main__':
	app.run_server(host='127.0.0.1')