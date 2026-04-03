/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-cloudbedspms/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class CloudbedsPMS implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cloudbeds PMS',
    name: 'cloudbedspms',
    icon: 'file:cloudbedspms.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Cloudbeds PMS API',
    defaults: {
      name: 'Cloudbeds PMS',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'cloudbedspmsApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Reservation',
            value: 'reservation',
          },
          {
            name: 'Guest',
            value: 'guest',
          },
          {
            name: 'Room',
            value: 'room',
          },
          {
            name: 'Housekeeping',
            value: 'housekeeping',
          },
          {
            name: 'Rate',
            value: 'rate',
          },
          {
            name: 'Property',
            value: 'property',
          }
        ],
        default: 'reservation',
      },
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['reservation'] } },
	options: [
		{
			name: 'Get Reservations',
			value: 'getReservations',
			description: 'Get all reservations with filtering options',
			action: 'Get all reservations'
		},
		{
			name: 'Get Reservation',
			value: 'getReservation',
			description: 'Get specific reservation details',
			action: 'Get a reservation'
		},
		{
			name: 'Create Reservation',
			value: 'createReservation',
			description: 'Create a new reservation',
			action: 'Create a reservation'
		},
		{
			name: 'Update Reservation',
			value: 'updateReservation',
			description: 'Update existing reservation',
			action: 'Update a reservation'
		},
		{
			name: 'Delete Reservation',
			value: 'deleteReservation',
			description: 'Cancel/delete reservation',
			action: 'Delete a reservation'
		}
	],
	default: 'getReservations'
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['guest'] } },
  options: [
    { name: 'Get All Guests', value: 'getGuests', description: 'Get all guests with filtering options', action: 'Get all guests' },
    { name: 'Get Guest', value: 'getGuest', description: 'Get specific guest details', action: 'Get guest' },
    { name: 'Create Guest', value: 'createGuest', description: 'Create new guest profile', action: 'Create guest' },
    { name: 'Update Guest', value: 'updateGuest', description: 'Update guest information', action: 'Update guest' },
    { name: 'Delete Guest', value: 'deleteGuest', description: 'Delete guest profile', action: 'Delete guest' }
  ],
  default: 'getGuests',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['room'] } },
  options: [
    { name: 'Get Room Types', value: 'getRoomTypes', description: 'Get all room types for property', action: 'Get room types' },
    { name: 'Get Room Type', value: 'getRoomType', description: 'Get specific room type details', action: 'Get room type' },
    { name: 'Get Rooms', value: 'getRooms', description: 'Get all rooms with status', action: 'Get rooms' },
    { name: 'Get Room', value: 'getRoom', description: 'Get specific room details', action: 'Get room' },
    { name: 'Update Room', value: 'updateRoom', description: 'Update room status or details', action: 'Update room' }
  ],
  default: 'getRoomTypes',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['housekeeping'],
		},
	},
	options: [
		{
			name: 'Get Housekeeping Items',
			value: 'getHousekeepingItems',
			description: 'Get housekeeping tasks and status',
			action: 'Get housekeeping items',
		},
		{
			name: 'Update Housekeeping Item',
			value: 'updateHousekeepingItem',
			description: 'Update room cleaning status',
			action: 'Update housekeeping item',
		},
		{
			name: 'Create Housekeeping Item',
			value: 'createHousekeepingItem',
			description: 'Create housekeeping task',
			action: 'Create housekeeping item',
		},
	],
	default: 'getHousekeepingItems',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['rate'],
		},
	},
	options: [
		{
			name: 'Get Rates',
			value: 'getRates',
			description: 'Get rates for date range',
			action: 'Get rates for date range',
		},
		{
			name: 'Create Rates',
			value: 'createRates',
			description: 'Set rates for specific dates',
			action: 'Create rates for specific dates',
		},
		{
			name: 'Update Rates',
			value: 'updateRates',
			description: 'Update existing rates',
			action: 'Update existing rates',
		},
		{
			name: 'Delete Rates',
			value: 'deleteRates',
			description: 'Remove rates for specific dates',
			action: 'Delete rates for specific dates',
		},
	],
	default: 'getRates',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['property'],
		},
	},
	options: [
		{
			name: 'Get All Properties',
			value: 'getProperties',
			description: 'Get all accessible properties',
			action: 'Get all properties',
		},
		{
			name: 'Get Property',
			value: 'getProperty',
			description: 'Get specific property details',
			action: 'Get a property',
		},
		{
			name: 'Update Property',
			value: 'updateProperty',
			description: 'Update property information',
			action: 'Update a property',
		},
	],
	default: 'getProperties',
},
{
	displayName: 'Property ID',
	name: 'propertyID',
	type: 'string',
	required: true,
	default: '',
	description: 'The property ID for the hotel/property',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations', 'getReservation', 'createReservation', 'updateReservation', 'deleteReservation']
		}
	}
},
{
	displayName: 'Reservation ID',
	name: 'reservationID',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the reservation',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservation', 'updateReservation', 'deleteReservation']
		}
	}
},
{
	displayName: 'Status',
	name: 'status',
	type: 'string',
	default: '',
	description: 'Filter reservations by status',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Check In From',
	name: 'checkInFrom',
	type: 'dateTime',
	default: '',
	description: 'Filter reservations by check-in date from',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Check In To',
	name: 'checkInTo',
	type: 'dateTime',
	default: '',
	description: 'Filter reservations by check-in date to',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Check Out From',
	name: 'checkOutFrom',
	type: 'dateTime',
	default: '',
	description: 'Filter reservations by check-out date from',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Check Out To',
	name: 'checkOutTo',
	type: 'dateTime',
	default: '',
	description: 'Filter reservations by check-out date to',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 100,
	description: 'Maximum number of results to return',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
	description: 'Number of results to skip',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['getReservations']
		}
	}
},
{
	displayName: 'Guest ID',
	name: 'guestID',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the guest making the reservation',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['createReservation']
		}
	}
},
{
	displayName: 'Room Type ID',
	name: 'roomTypeID',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the room type to reserve',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['createReservation']
		}
	}
},
{
	displayName: 'Check In',
	name: 'checkIn',
	type: 'dateTime',
	required: true,
	default: '',
	description: 'Check-in date and time',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['createReservation']
		}
	}
},
{
	displayName: 'Check Out',
	name: 'checkOut',
	type: 'dateTime',
	required: true,
	default: '',
	description: 'Check-out date and time',
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['createReservation']
		}
	}
},
{
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	displayOptions: {
		show: {
			resource: ['reservation'],
			operation: ['createReservation', 'updateReservation']
		}
	},
	options: [
		{
			displayName: 'Notes',
			name: 'notes',
			type: 'string',
			default: '',
			description: 'Additional notes for the reservation'
		},
		{
			displayName: 'Adults',
			name: 'adults',
			type: 'number',
			default: 1,
			description: 'Number of adults'
		},
		{
			displayName: 'Children',
			name: 'children',
			type: 'number',
			default: 0,
			description: 'Number of children'
		}
	]
},
{
  displayName: 'Property ID',
  name: 'propertyID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['guest'], operation: ['getGuests', 'getGuest', 'createGuest', 'updateGuest', 'deleteGuest'] } },
  default: '',
  description: 'The property ID for the operation',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['guest'], operation: ['getGuests'] } },
  default: 50,
  description: 'Maximum number of guests to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: { show: { resource: ['guest'], operation: ['getGuests'] } },
  default: 0,
  description: 'Number of guests to skip for pagination',
},
{
  displayName: 'Guest ID',
  name: 'guestID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['guest'], operation: ['getGuest', 'updateGuest', 'deleteGuest'] } },
  default: '',
  description: 'The guest ID for the operation',
},
{
  displayName: 'First Name',
  name: 'firstName',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['guest'], operation: ['createGuest'] } },
  default: '',
  description: 'Guest first name',
},
{
  displayName: 'Last Name',
  name: 'lastName',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['guest'], operation: ['createGuest'] } },
  default: '',
  description: 'Guest last name',
},
{
  displayName: 'Email',
  name: 'email',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['guest'], operation: ['createGuest'] } },
  default: '',
  description: 'Guest email address',
},
{
  displayName: 'Update Data',
  name: 'updateData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['guest'], operation: ['updateGuest'] } },
  default: '{}',
  description: 'JSON object containing the fields to update',
},
{
  displayName: 'Property ID',
  name: 'propertyID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['room'], operation: ['getRoomTypes', 'getRoomType', 'getRooms', 'getRoom', 'updateRoom'] } },
  default: '',
  description: 'The ID of the property',
},
{
  displayName: 'Room Type ID',
  name: 'roomTypeID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['room'], operation: ['getRoomType'] } },
  default: '',
  description: 'The ID of the room type',
},
{
  displayName: 'Room ID',
  name: 'roomID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['room'], operation: ['getRoom', 'updateRoom'] } },
  default: '',
  description: 'The ID of the room',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['room'], operation: ['getRoomTypes', 'getRooms'] } },
  default: 50,
  description: 'Number of results to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: { show: { resource: ['room'], operation: ['getRoomTypes', 'getRooms'] } },
  default: 0,
  description: 'Number of results to skip',
},
{
  displayName: 'Room Status',
  name: 'roomStatus',
  type: 'options',
  displayOptions: { show: { resource: ['room'], operation: ['updateRoom'] } },
  options: [
    { name: 'Clean', value: 'clean' },
    { name: 'Dirty', value: 'dirty' },
    { name: 'Out of Order', value: 'out_of_order' },
    { name: 'Maintenance', value: 'maintenance' }
  ],
  default: 'clean',
  description: 'The status to set for the room',
},
{
  displayName: 'Additional Fields',
  name: 'additionalFields',
  type: 'collection',
  placeholder: 'Add Field',
  displayOptions: { show: { resource: ['room'], operation: ['updateRoom'] } },
  default: {},
  options: [
    {
      displayName: 'Notes',
      name: 'notes',
      type: 'string',
      default: '',
      description: 'Notes for the room',
    },
    {
      displayName: 'Housekeeping Notes',
      name: 'housekeepingNotes',
      type: 'string',
      default: '',
      description: 'Housekeeping notes for the room',
    }
  ],
},
{
	displayName: 'Property ID',
	name: 'propertyID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['getHousekeepingItems', 'updateHousekeepingItem', 'createHousekeepingItem'],
		},
	},
	default: '',
	description: 'The ID of the property',
},
{
	displayName: 'Date',
	name: 'date',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['getHousekeepingItems'],
		},
	},
	default: '',
	description: 'Date for housekeeping items (YYYY-MM-DD format)',
},
{
	displayName: 'Room ID',
	name: 'roomID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['updateHousekeepingItem', 'createHousekeepingItem'],
		},
	},
	default: '',
	description: 'The ID of the room',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['updateHousekeepingItem'],
		},
	},
	options: [
		{
			name: 'Clean',
			value: 'clean',
		},
		{
			name: 'Dirty',
			value: 'dirty',
		},
		{
			name: 'Out of Order',
			value: 'out_of_order',
		},
		{
			name: 'Maintenance',
			value: 'maintenance',
		},
	],
	default: 'clean',
	description: 'The cleaning status of the room',
},
{
	displayName: 'Task Type',
	name: 'taskType',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['createHousekeepingItem'],
		},
	},
	options: [
		{
			name: 'Cleaning',
			value: 'cleaning',
		},
		{
			name: 'Maintenance',
			value: 'maintenance',
		},
		{
			name: 'Inspection',
			value: 'inspection',
		},
		{
			name: 'Deep Clean',
			value: 'deep_clean',
		},
	],
	default: 'cleaning',
	description: 'The type of housekeeping task to create',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['getHousekeepingItems'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['housekeeping'],
			operation: ['getHousekeepingItems'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Property ID',
	name: 'propertyID',
	type: 'string',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['getRates', 'createRates', 'updateRates', 'deleteRates'],
		},
	},
	description: 'The property ID for the rate operation',
},
{
	displayName: 'Room Type ID',
	name: 'roomTypeID',
	type: 'string',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['getRates', 'createRates', 'updateRates', 'deleteRates'],
		},
	},
	description: 'The room type ID for the rate operation',
},
{
	displayName: 'Start Date',
	name: 'startDate',
	type: 'dateTime',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['getRates'],
		},
	},
	description: 'The start date for the rate range (YYYY-MM-DD format)',
},
{
	displayName: 'End Date',
	name: 'endDate',
	type: 'dateTime',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['getRates'],
		},
	},
	description: 'The end date for the rate range (YYYY-MM-DD format)',
},
{
	displayName: 'Date',
	name: 'date',
	type: 'dateTime',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['createRates', 'updateRates', 'deleteRates'],
		},
	},
	description: 'The specific date for the rate operation (YYYY-MM-DD format)',
},
{
	displayName: 'Rate',
	name: 'rate',
	type: 'number',
	required: true,
	default: 0,
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['createRates', 'updateRates'],
		},
	},
	description: 'The rate amount to set or update',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	required: false,
	default: 50,
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['getRates'],
		},
	},
	description: 'Number of results to return per page',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	required: false,
	default: 0,
	displayOptions: {
		show: {
			resource: ['rate'],
			operation: ['getRates'],
		},
	},
	description: 'Number of results to skip for pagination',
},
{
	displayName: 'Property ID',
	name: 'propertyID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['getProperty', 'updateProperty'],
		},
	},
	default: '',
	description: 'The ID of the property',
},
{
	displayName: 'Property Name',
	name: 'propertyName',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Name of the property',
},
{
	displayName: 'Property Description',
	name: 'propertyDescription',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Description of the property',
},
{
	displayName: 'Property Address',
	name: 'propertyAddress',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Address of the property',
},
{
	displayName: 'Property Phone',
	name: 'propertyPhone',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Phone number of the property',
},
{
	displayName: 'Property Email',
	name: 'propertyEmail',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Email address of the property',
},
{
	displayName: 'Currency Code',
	name: 'currencyCode',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Currency code for the property (e.g., USD, EUR)',
},
{
	displayName: 'Timezone',
	name: 'timezone',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	default: '',
	description: 'Timezone of the property',
},
{
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	displayOptions: {
		show: {
			resource: ['property'],
			operation: ['updateProperty'],
		},
	},
	options: [
		{
			displayName: 'Website',
			name: 'website',
			type: 'string',
			default: '',
			description: 'Website URL of the property',
		},
		{
			displayName: 'Check-in Time',
			name: 'checkinTime',
			type: 'string',
			default: '',
			description: 'Default check-in time (HH:MM format)',
		},
		{
			displayName: 'Check-out Time',
			name: 'checkoutTime',
			type: 'string',
			default: '',
			description: 'Default check-out time (HH:MM format)',
		},
	],
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'reservation':
        return [await executeReservationOperations.call(this, items)];
      case 'guest':
        return [await executeGuestOperations.call(this, items)];
      case 'room':
        return [await executeRoomOperations.call(this, items)];
      case 'housekeeping':
        return [await executeHousekeepingOperations.call(this, items)];
      case 'rate':
        return [await executeRateOperations.call(this, items)];
      case 'property':
        return [await executePropertyOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeReservationOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cloudbedspmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getReservations': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const status = this.getNodeParameter('status', i) as string;
					const checkInFrom = this.getNodeParameter('checkInFrom', i) as string;
					const checkInTo = this.getNodeParameter('checkInTo', i) as string;
					const checkOutFrom = this.getNodeParameter('checkOutFrom', i) as string;
					const checkOutTo = this.getNodeParameter('checkOutTo', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const queryParams = new URLSearchParams();
					queryParams.append('propertyID', propertyID);
					if (status) queryParams.append('status', status);
					if (checkInFrom) queryParams.append('checkInFrom', checkInFrom);
					if (checkInTo) queryParams.append('checkInTo', checkInTo);
					if (checkOutFrom) queryParams.append('checkOutFrom', checkOutFrom);
					if (checkOutTo) queryParams.append('checkOutTo', checkOutTo);
					queryParams.append('limit', limit.toString());
					queryParams.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `https://api.cloudbeds.com/api/v1.1/getReservations?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json'
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getReservation': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const reservationID = this.getNodeParameter('reservationID', i) as string;

					const queryParams = new URLSearchParams();
					queryParams.append('propertyID', propertyID);
					queryParams.append('reservationID', reservationID);

					const options: any = {
						method: 'GET',
						url: `https://api.cloudbeds.com/api/v1.1/getReservation?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json'
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createReservation': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const guestID = this.getNodeParameter('guestID', i) as string;
					const roomTypeID = this.getNodeParameter('roomTypeID', i) as string;
					const checkIn = this.getNodeParameter('checkIn', i) as string;
					const checkOut = this.getNodeParameter('checkOut', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;

					const body: any = {
						propertyID,
						guestID,
						roomTypeID,
						checkIn,
						checkOut,
						...additionalFields
					};

					const options: any = {
						method: 'POST',
						url: 'https://api.cloudbeds.com/api/v1.1/postReservation',
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json'
						},
						body,
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateReservation': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const reservationID = this.getNodeParameter('reservationID', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;

					const body: any = {
						propertyID,
						reservationID,
						...additionalFields
					};

					const options: any = {
						method: 'PUT',
						url: 'https://api.cloudbeds.com/api/v1.1/putReservation',
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json'
						},
						body,
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteReservation': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const reservationID = this.getNodeParameter('reservationID', i) as string;

					const queryParams = new URLSearchParams();
					queryParams.append('propertyID', propertyID);
					queryParams.append('reservationID', reservationID);

					const options: any = {
						method: 'DELETE',
						url: `https://api.cloudbeds.com/api/v1.1/deleteReservation?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json'
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i }
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i }
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeGuestOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cloudbedspmsApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const propertyID = this.getNodeParameter('propertyID', i) as string;

      switch (operation) {
        case 'getGuests': {
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/getGuests`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              limit,
              offset,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getGuest': {
          const guestID = this.getNodeParameter('guestID', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/getGuest`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              guestID,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'createGuest': {
          const firstName = this.getNodeParameter('firstName', i) as string;
          const lastName = this.getNodeParameter('lastName', i) as string;
          const email = this.getNodeParameter('email', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/postGuest`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: {
              propertyID,
              firstName,
              lastName,
              email,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'updateGuest': {
          const guestID = this.getNodeParameter('guestID', i) as string;
          const updateData = this.getNodeParameter('updateData', i) as any;
          
          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/putGuest`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: {
              propertyID,
              guestID,
              ...updateData,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'deleteGuest': {
          const guestID = this.getNodeParameter('guestID', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/deleteGuest`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              guestID,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeRoomOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cloudbedspmsApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const propertyID = this.getNodeParameter('propertyID', i) as string;

      switch (operation) {
        case 'getRoomTypes': {
          const limit = this.getNodeParameter('limit', i, 50) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          const options: any = {
            method: 'GET',
            url: `https://api.cloudbeds.com/api/v1.1/getRoomTypes`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              limit,
              offset,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getRoomType': {
          const roomTypeID = this.getNodeParameter('roomTypeID', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `https://api.cloudbeds.com/api/v1.1/getRoomType`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              roomTypeID,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getRooms': {
          const limit = this.getNodeParameter('limit', i, 50) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;
          
          const options: any = {
            method: 'GET',
            url: `https://api.cloudbeds.com/api/v1.1/getRooms`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              limit,
              offset,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getRoom': {
          const roomID = this.getNodeParameter('roomID', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `https://api.cloudbeds.com/api/v1.1/getRoom`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              propertyID,
              roomID,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateRoom': {
          const roomID = this.getNodeParameter('roomID', i) as string;
          const roomStatus = this.getNodeParameter('roomStatus', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as any;

          const body: any = {
            propertyID,
            roomID,
            roomStatus,
            ...additionalFields,
          };
          
          const options: any = {
            method: 'PUT',
            url: `https://api.cloudbeds.com/api/v1.1/putRoom`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeHousekeepingOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cloudbedspmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getHousekeepingItems': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const date = this.getNodeParameter('date', i) as string;
					const limit = this.getNodeParameter('limit', i, 50) as number;
					const offset = this.getNodeParameter('offset', i, 0) as number;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/getHousekeepingItems`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						qs: {
							propertyID,
							date,
							limit,
							offset,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateHousekeepingItem': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const roomID = this.getNodeParameter('roomID', i) as string;
					const status = this.getNodeParameter('status', i) as string;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/putHousekeepingItem`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							propertyID,
							roomID,
							status,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createHousekeepingItem': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const roomID = this.getNodeParameter('roomID', i) as string;
					const taskType = this.getNodeParameter('taskType', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/postHousekeepingItem`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							propertyID,
							roomID,
							taskType,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeRateOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cloudbedspmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getRates': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const roomTypeID = this.getNodeParameter('roomTypeID', i) as string;
					const startDate = this.getNodeParameter('startDate', i) as string;
					const endDate = this.getNodeParameter('endDate', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const queryParams = new URLSearchParams({
						propertyID,
						roomTypeID,
						startDate: startDate.split('T')[0],
						endDate: endDate.split('T')[0],
						limit: limit.toString(),
						offset: offset.toString(),
					});

					const options: any = {
						method: 'GET',
						url: `https://api.cloudbeds.com/api/v1.1/getRates?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createRates': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const roomTypeID = this.getNodeParameter('roomTypeID', i) as string;
					const date = this.getNodeParameter('date', i) as string;
					const rate = this.getNodeParameter('rate', i) as number;

					const options: any = {
						method: 'POST',
						url: 'https://api.cloudbeds.com/api/v1.1/postRates',
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							propertyID,
							roomTypeID,
							date: date.split('T')[0],
							rate,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateRates': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const roomTypeID = this.getNodeParameter('roomTypeID', i) as string;
					const date = this.getNodeParameter('date', i) as string;
					const rate = this.getNodeParameter('rate', i) as number;

					const options: any = {
						method: 'PUT',
						url: 'https://api.cloudbeds.com/api/v1.1/putRates',
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							propertyID,
							roomTypeID,
							date: date.split('T')[0],
							rate,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteRates': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const roomTypeID = this.getNodeParameter('roomTypeID', i) as string;
					const date = this.getNodeParameter('date', i) as string;

					const options: any = {
						method: 'DELETE',
						url: 'https://api.cloudbeds.com/api/v1.1/deleteRates',
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							propertyID,
							roomTypeID,
							date: date.split('T')[0],
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: {
					item: i,
				},
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
					},
					pairedItem: {
						item: i,
					},
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executePropertyOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cloudbedspmsApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getProperties': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/getProperties`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getProperty': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/getProperty`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						qs: {
							propertyID,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateProperty': {
					const propertyID = this.getNodeParameter('propertyID', i) as string;
					const propertyName = this.getNodeParameter('propertyName', i) as string;
					const propertyDescription = this.getNodeParameter('propertyDescription', i) as string;
					const propertyAddress = this.getNodeParameter('propertyAddress', i) as string;
					const propertyPhone = this.getNodeParameter('propertyPhone', i) as string;
					const propertyEmail = this.getNodeParameter('propertyEmail', i) as string;
					const currencyCode = this.getNodeParameter('currencyCode', i) as string;
					const timezone = this.getNodeParameter('timezone', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;

					const body: any = {
						propertyID,
					};

					if (propertyName) body.propertyName = propertyName;
					if (propertyDescription) body.propertyDescription = propertyDescription;
					if (propertyAddress) body.propertyAddress = propertyAddress;
					if (propertyPhone) body.propertyPhone = propertyPhone;
					if (propertyEmail) body.propertyEmail = propertyEmail;
					if (currencyCode) body.currencyCode = currencyCode;
					if (timezone) body.timezone = timezone;

					if (additionalFields.website) body.website = additionalFields.website;
					if (additionalFields.checkinTime) body.checkinTime = additionalFields.checkinTime;
					if (additionalFields.checkoutTime) body.checkoutTime = additionalFields.checkoutTime;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/putProperty`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
