# n8n-nodes-cloudbeds-pms

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for the Cloudbeds Property Management System, providing access to 6 core resources for hospitality automation. Manage reservations, guests, rooms, housekeeping operations, rates, and property data with seamless integration capabilities for hotel and vacation rental management workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Hospitality](https://img.shields.io/badge/Industry-Hospitality-green)
![PMS](https://img.shields.io/badge/Platform-Property%20Management-orange)
![API](https://img.shields.io/badge/Cloudbeds-PMS%20API-blue)

## Features

- **Reservation Management** - Create, update, retrieve, and manage hotel reservations and bookings
- **Guest Operations** - Handle guest profiles, contact information, and customer relationship data
- **Room Administration** - Manage room inventory, types, availability, and occupancy status
- **Housekeeping Control** - Track room cleaning status, maintenance requests, and housekeeping schedules
- **Rate Management** - Configure pricing strategies, seasonal rates, and dynamic pricing rules
- **Property Configuration** - Access property details, amenities, policies, and facility information
- **Real-time Synchronization** - Keep your automation workflows synchronized with live PMS data
- **Comprehensive Error Handling** - Built-in retry logic and detailed error reporting for reliable operations

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-cloudbeds-pms`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-cloudbeds-pms
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-cloudbeds-pms.git
cd n8n-nodes-cloudbeds-pms
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-cloudbeds-pms
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Cloudbeds PMS API key from the developer settings | Yes |
| Property ID | The unique identifier for your property in Cloudbeds | Yes |
| Environment | API environment (production or sandbox) | Yes |

## Resources & Operations

### 1. Reservation

| Operation | Description |
|-----------|-------------|
| Create | Create a new reservation with guest and room details |
| Get | Retrieve reservation information by ID |
| Update | Modify existing reservation details |
| List | Get multiple reservations with filtering options |
| Cancel | Cancel an existing reservation |
| Check In | Process guest check-in for a reservation |
| Check Out | Process guest check-out and finalize stay |

### 2. Guest

| Operation | Description |
|-----------|-------------|
| Create | Add a new guest profile to the system |
| Get | Retrieve guest information by ID |
| Update | Modify guest profile details |
| List | Get multiple guest profiles with search filters |
| Delete | Remove a guest profile from the system |
| Search | Find guests by name, email, or phone number |

### 3. Room

| Operation | Description |
|-----------|-------------|
| Get | Retrieve room details and current status |
| Update | Modify room information and settings |
| List | Get all rooms with availability status |
| Get Availability | Check room availability for date ranges |
| Set Status | Update room status (available, occupied, maintenance) |
| Get Types | Retrieve room type configurations |

### 4. Housekeeping

| Operation | Description |
|-----------|-------------|
| Get Tasks | Retrieve housekeeping tasks for specific dates |
| Update Task | Update housekeeping task status |
| Create Task | Add new housekeeping or maintenance task |
| List Assignments | Get housekeeping staff assignments |
| Get Status | Check room cleaning and maintenance status |
| Complete Task | Mark housekeeping task as completed |

### 5. Rate

| Operation | Description |
|-----------|-------------|
| Get | Retrieve rate information for specific dates |
| Update | Modify room rates and pricing |
| List | Get rate schedules and pricing calendars |
| Create Plan | Set up new rate plans and packages |
| Get Availability | Check rate availability for date ranges |
| Bulk Update | Update rates for multiple dates at once |

### 6. Property

| Operation | Description |
|-----------|-------------|
| Get | Retrieve property details and configuration |
| Update | Modify property information and settings |
| Get Amenities | List property amenities and facilities |
| Get Policies | Retrieve property policies and rules |
| Get Settings | Access property-specific configuration settings |

## Usage Examples

```javascript
// Create a new reservation
const reservationData = {
  "guestId": "12345",
  "roomTypeId": "67890", 
  "checkInDate": "2024-02-15",
  "checkOutDate": "2024-02-18",
  "adults": 2,
  "children": 0,
  "totalAmount": 450.00,
  "status": "confirmed"
};
```

```javascript
// Check room availability for specific dates
const availabilityCheck = {
  "startDate": "2024-03-01",
  "endDate": "2024-03-07",
  "roomTypeId": "suite_001",
  "adults": 2,
  "children": 1
};
```

```javascript
// Update housekeeping task status
const housekeepingUpdate = {
  "taskId": "hk_789",
  "roomNumber": "101",
  "status": "completed",
  "completedBy": "staff_456",
  "notes": "Deep cleaning completed, room ready for guest"
};
```

```javascript
// Bulk update room rates for peak season
const rateUpdate = {
  "roomTypeId": "standard_room",
  "startDate": "2024-06-01",
  "endDate": "2024-08-31", 
  "baseRate": 185.00,
  "currency": "USD"
};
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API key or expired credentials | Verify API key in credentials and regenerate if necessary |
| 404 Not Found | Requested resource (reservation, guest, room) not found | Confirm the ID exists and is correctly formatted |
| 400 Bad Request | Invalid data format or missing required fields | Check request payload against API documentation |
| 429 Rate Limited | Too many API requests in short timeframe | Implement delays between requests or reduce frequency |
| 500 Server Error | Internal Cloudbeds API error | Retry request after brief delay, contact support if persistent |
| Connection Timeout | Network connectivity issues with Cloudbeds servers | Check internet connection and retry operation |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-cloudbeds-pms/issues)
- **Cloudbeds API Documentation**: [Cloudbeds Developer Portal](https://docs.cloudbeds.com/reference/getting-started-with-your-api)
- **Hospitality Automation Community**: [n8n Community Forum](https://community.n8n.io/)