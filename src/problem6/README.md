# Score Board Module Specification

## Overview

This module handles the real-time updating of user scores and broadcasting changes to the score board. It ensures secure score updates and maintains a live top 10 leaderboard visible to all users.

## Features

- Secure API endpoint for updating user scores
- Authentication and authorization for score updates
- Real-time broadcasting of score board changes
- Maintenance of top 10 leaderboard

## Architecture

The module follows a client-server architecture with WebSocket connections for real-time updates:

1. REST API for score updates (authenticated)
2. Database for storing user scores
3. WebSocket server for broadcasting score board changes

## API Endpoints

### POST /api/scores/update

Updates a user's score after completing an action.

**Request:**

```json
{
  "userId": "string",
  "actionId": "string"
}
```

**Headers:**

- `Authorization: Bearer <token>`

**Response:**

```json
{
  "userId": "string",
  "newScore": number,
  "rank": number,
  "topTen": [
    {
      "userId": "string",
      "username": "string",
      "score": number,
      "rank": number
    }
  ]
}
```

## WebSocket Events

### Event: `scoreboard-update`

Sent to all connected clients when the top 10 leaderboard changes.

**Payload:**

```json
{
  "topTen": [
    {
      "userId": "string",
      "username": "string",
      "score": number,
      "rank": number
    }
  ],
  "lastUpdated": "ISO timestamp"
}
```

## Security Considerations

- All score update requests must include a valid JWT token
- Action IDs should be validated to prevent duplicate submissions
- Rate limiting should be implemented to prevent abuse
- Score calculations should happen server-side only

## Database Schema

### Users Table

- `id`: Primary key
- `username`: User's display name
- `score`: Current total score
- Other user fields...

### Actions Table

- `id`: Primary key
- `userId`: Foreign key to Users
- `actionType`: Type of action performed
- `scoreValue`: Points awarded for this action
- `timestamp`: When the action was performed

## Implementation Notes

- Use Redis for caching the top 10 leaderboard for quick access
- Implement proper error handling and logging
- Consider database locking strategies for concurrent score updates
