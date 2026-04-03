/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloudbedsPMS } from '../nodes/Cloudbeds PMS/Cloudbeds PMS.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('CloudbedsPMS Node', () => {
  let node: CloudbedsPMS;

  beforeAll(() => {
    node = new CloudbedsPMS();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Cloudbeds PMS');
      expect(node.description.name).toBe('cloudbedspms');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Reservation Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://api.cloudbeds.com/api/v1.1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn()
			}
		};
	});

	it('should get reservations successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getReservations')
			.mockReturnValueOnce('prop123')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('')
			.mockReturnValueOnce(100)
			.mockReturnValueOnce(0);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({
			success: true,
			data: [{ reservationID: '123', status: 'confirmed' }]
		});

		const items = [{ json: {} }];
		const result = await executeReservationOperations.call(mockExecuteFunctions, items);

		expect(result[0].json.success).toBe(true);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'GET',
				url: expect.stringContaining('getReservations')
			})
		);
	});

	it('should get specific reservation successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getReservation')
			.mockReturnValueOnce('prop123')
			.mockReturnValueOnce('res456');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({
			success: true,
			data: { reservationID: 'res456', status: 'confirmed' }
		});

		const items = [{ json: {} }];
		const result = await executeReservationOperations.call(mockExecuteFunctions, items);

		expect(result[0].json.success).toBe(true);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'GET',
				url: expect.stringContaining('getReservation')
			})
		);
	});

	it('should create reservation successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createReservation')
			.mockReturnValueOnce('prop123')
			.mockReturnValueOnce('guest456')
			.mockReturnValueOnce('room789')
			.mockReturnValueOnce('2024-01-01')
			.mockReturnValueOnce('2024-01-03')
			.mockReturnValueOnce({});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({
			success: true,
			data: { reservationID: 'new123', status: 'confirmed' }
		});

		const items = [{ json: {} }];
		const result = await executeReservationOperations.call(mockExecuteFunctions, items);

		expect(result[0].json.success).toBe(true);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'POST',
				url: expect.stringContaining('postReservation')
			})
		);
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getReservations');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(new Error('API Error'));

		const items = [{ json: {} }];
		const result = await executeReservationOperations.call(mockExecuteFunctions, items);

		expect(result[0].json.error).toBe('API Error');
	});
});

describe('Guest Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://api.cloudbeds.com/api/v1.1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should get all guests successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((name: string) => {
      switch (name) {
        case 'operation': return 'getGuests';
        case 'propertyID': return 'prop123';
        case 'limit': return 50;
        case 'offset': return 0;
        default: return null;
      }
    });

    const mockResponse = { data: [{ id: '1', firstName: 'John', lastName: 'Doe' }] };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeGuestOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.cloudbeds.com/api/v1.1/getGuests',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      qs: { propertyID: 'prop123', limit: 50, offset: 0 },
      json: true,
    });
  });

  it('should create guest successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((name: string) => {
      switch (name) {
        case 'operation': return 'createGuest';
        case 'propertyID': return 'prop123';
        case 'firstName': return 'John';
        case 'lastName': return 'Doe';
        case 'email': return 'john.doe@example.com';
        default: return null;
      }
    });

    const mockResponse = { success: true, guestID: '12345' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeGuestOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.cloudbeds.com/api/v1.1/postGuest',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: {
        propertyID: 'prop123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
      json: true,
    });
  });

  it('should handle errors and continue on fail', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((name: string) => {
      switch (name) {
        case 'operation': return 'getGuests';
        default: return 'test-value';
      }
    });

    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeGuestOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });

  it('should throw error when not continuing on fail', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((name: string) => {
      switch (name) {
        case 'operation': return 'getGuests';
        default: return 'test-value';
      }
    });

    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    const apiError = new Error('API Error');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

    await expect(executeGuestOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});

describe('Room Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        accessToken: 'test-access-token',
        baseUrl: 'https://api.cloudbeds.com/api/v1.1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getRoomTypes operation', () => {
    it('should get room types successfully', async () => {
      const mockResponse = { success: true, data: [{ roomTypeID: '1', name: 'Standard Room' }] };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getRoomTypes')
        .mockReturnValueOnce('property123')
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(0);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRoomOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.cloudbeds.com/api/v1.1/getRoomTypes',
        headers: {
          'Authorization': 'Bearer test-access-token',
          'Content-Type': 'application/json',
        },
        qs: {
          propertyID: 'property123',
          limit: 50,
          offset: 0,
        },
        json: true,
      });
    });

    it('should handle errors when getting room types', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getRoomTypes')
        .mockReturnValueOnce('property123');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeRoomOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('updateRoom operation', () => {
    it('should update room successfully', async () => {
      const mockResponse = { success: true, message: 'Room updated successfully' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateRoom')
        .mockReturnValueOnce('property123')
        .mockReturnValueOnce('room456')
        .mockReturnValueOnce('clean')
        .mockReturnValueOnce({ notes: 'Room cleaned and ready' });
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRoomOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'PUT',
        url: 'https://api.cloudbeds.com/api/v1.1/putRoom',
        headers: {
          'Authorization': 'Bearer test-access-token',
          'Content-Type': 'application/json',
        },
        body: {
          propertyID: 'property123',
          roomID: 'room456',
          roomStatus: 'clean',
          notes: 'Room cleaned and ready',
        },
        json: true,
      });
    });
  });
});

describe('Housekeeping Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://api.cloudbeds.com/api/v1.1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get housekeeping items successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getHousekeepingItems')
			.mockReturnValueOnce('prop123')
			.mockReturnValueOnce('2023-12-01')
			.mockReturnValueOnce(50)
			.mockReturnValueOnce(0);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			data: [{ roomID: 'room1', status: 'clean' }],
		});

		const result = await executeHousekeepingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.cloudbeds.com/api/v1.1/getHousekeepingItems',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			qs: {
				propertyID: 'prop123',
				date: '2023-12-01',
				limit: 50,
				offset: 0,
			},
			json: true,
		});

		expect(result).toEqual([
			{
				json: { data: [{ roomID: 'room1', status: 'clean' }] },
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should update housekeeping item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('updateHousekeepingItem')
			.mockReturnValueOnce('prop123')
			.mockReturnValueOnce('room1')
			.mockReturnValueOnce('clean');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			success: true,
			message: 'Status updated',
		});

		const result = await executeHousekeepingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'PUT',
			url: 'https://api.cloudbeds.com/api/v1.1/putHousekeepingItem',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			body: {
				propertyID: 'prop123',
				roomID: 'room1',
				status: 'clean',
			},
			json: true,
		});

		expect(result).toEqual([
			{
				json: { success: true, message: 'Status updated' },
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should create housekeeping item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createHousekeepingItem')
			.mockReturnValueOnce('prop123')
			.mockReturnValueOnce('room1')
			.mockReturnValueOnce('cleaning');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			taskID: 'task123',
			message: 'Task created',
		});

		const result = await executeHousekeepingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://api.cloudbeds.com/api/v1.1/postHousekeepingItem',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			body: {
				propertyID: 'prop123',
				roomID: 'room1',
				taskType: 'cleaning',
			},
			json: true,
		});

		expect(result).toEqual([
			{
				json: { taskID: 'task123', message: 'Task created' },
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should handle errors when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getHousekeepingItems');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeHousekeepingOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([
			{
				json: { error: 'API Error' },
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getHousekeepingItems');
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		await expect(
			executeHousekeepingOperations.call(mockExecuteFunctions, [{ json: {} }]),
		).rejects.toThrow('API Error');
	});
});

describe('Rate Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-access-token',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getRates operation', () => {
		it('should get rates successfully', async () => {
			const mockResponse = {
				success: true,
				data: {
					rates: [
						{
							propertyID: '12345',
							roomTypeID: '67890',
							date: '2024-01-15',
							rate: 150.00,
						},
					],
				},
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z')
				.mockReturnValueOnce('2024-01-20T00:00:00.000Z')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle getRates error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z')
				.mockReturnValueOnce('2024-01-20T00:00:00.000Z')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0);

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'API Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('createRates operation', () => {
		it('should create rates successfully', async () => {
			const mockResponse = {
				success: true,
				data: {
					propertyID: '12345',
					roomTypeID: '67890',
					date: '2024-01-15',
					rate: 150.00,
				},
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z')
				.mockReturnValueOnce(150.00);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle createRates error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z')
				.mockReturnValueOnce(150.00);

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Create Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'Create Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('updateRates operation', () => {
		it('should update rates successfully', async () => {
			const mockResponse = {
				success: true,
				data: {
					propertyID: '12345',
					roomTypeID: '67890',
					date: '2024-01-15',
					rate: 175.00,
				},
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z')
				.mockReturnValueOnce(175.00);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle updateRates error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z')
				.mockReturnValueOnce(175.00);

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Update Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'Update Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('deleteRates operation', () => {
		it('should delete rates successfully', async () => {
			const mockResponse = {
				success: true,
				message: 'Rate deleted successfully',
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle deleteRates error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteRates')
				.mockReturnValueOnce('12345')
				.mockReturnValueOnce('67890')
				.mockReturnValueOnce('2024-01-15T00:00:00.000Z');

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Delete Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRateOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'Delete Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});
});

describe('Property Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://api.cloudbeds.com/api/v1.1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	test('should get all properties successfully', async () => {
		const mockResponse = { success: true, data: [{ propertyID: '123', name: 'Test Property' }] };
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getProperties');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executePropertyOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.cloudbeds.com/api/v1.1/getProperties',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should get specific property successfully', async () => {
		const mockResponse = { success: true, data: { propertyID: '123', name: 'Test Property' } };
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getProperty')
			.mockReturnValueOnce('123');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executePropertyOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.cloudbeds.com/api/v1.1/getProperty',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			qs: {
				propertyID: '123',
			},
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should update property successfully', async () => {
		const mockResponse = { success: true, message: 'Property updated successfully' };
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('updateProperty')
			.mockReturnValueOnce('123')
			.mockReturnValueOnce('Updated Property')
			.mockReturnValueOnce('Updated description')
			.mockReturnValueOnce('123 Main St')
			.mockReturnValueOnce('+1234567890')
			.mockReturnValueOnce('test@example.com')
			.mockReturnValueOnce('USD')
			.mockReturnValueOnce('America/New_York')
			.mockReturnValueOnce({});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executePropertyOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'PUT',
			url: 'https://api.cloudbeds.com/api/v1.1/putProperty',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			body: {
				propertyID: '123',
				propertyName: 'Updated Property',
				propertyDescription: 'Updated description',
				propertyAddress: '123 Main St',
				propertyPhone: '+1234567890',
				propertyEmail: 'test@example.com',
				currencyCode: 'USD',
				timezone: 'America/New_York',
			},
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should handle API errors gracefully', async () => {
		const error = new Error('API Error');
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getProperties');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executePropertyOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
	});

	test('should throw error when continueOnFail is false', async () => {
		const error = new Error('API Error');
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getProperties');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);

		await expect(
			executePropertyOperations.call(mockExecuteFunctions, [{ json: {} }])
		).rejects.toThrow('API Error');
	});
});
});
