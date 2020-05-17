import asyncio
import os
import json
import datetime
import random

from azure.iot.device.aio import ProvisioningDeviceClient
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import MethodResponse
from azure.iot.device import Message

async def main():
	# In a production environment, don't store
	# connection information in the code.
	provisioning_host = 'global.azure-devices-provisioning.net'
	id_scope = '{your Scope ID}'
	registration_id = '{your Device ID}'
	symmetric_key = '{your Primary Key}'

	delay = 2

	# All the remaining code is nested within this main function

if __name__ == '__main__':
	asyncio.run(main())
