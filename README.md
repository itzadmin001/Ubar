# API Documentation

This document outlines the available endpoints for the `UserRouter`, `CaptainRouter`, `LocationRouter`, and `RideRouter` in your Express application, along with their request and response formats.

## Base URLs
- User-related endpoints are prefixed with `/user`.
- Captain-related endpoints are prefixed with `/captain`.
- Location-related endpoints are prefixed with `/location`.
- Ride-related endpoints are prefixed with `/ride`.

---

## UserRouter Endpoints

### 1. `GET /user/okay`

#### Description
A simple health check endpoint.

#### Request
- **Headers**: None
- **Body**: None

#### Response
- **Status**: 200
- **Body**:
  ```json
  "okay"
  ```

---

### 2. `POST /user/register-user`

#### Description
Registers a new user.

#### Middleware
- `Uservalidation`: Validates the user input before proceeding.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "token": "string",
      "user": {
        "id": "string",
        "username": "string",
        "email": "string"
      }
    }
    ```
  - **Cookies**:
    - `token`: JWT token with `httpOnly` and `secure` options based on environment variables.

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 3. `POST /user/login`

#### Description
Logs in an existing user.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "token": "string",
      "user": {
        "id": "string",
        "username": "string",
        "email": "string"
      }
    }
    ```
  - **Cookies**:
    - `token`: JWT token.

- **Error**:
  - **Status**: 401
  - **Body**:
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

---

### 4. `GET /user/logout`

#### Description
Logs out the current user and clears the authentication token.

#### Request
- **Headers**:
  - Cookie: `token=<JWT token>`
- **Body**: None

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```
  - **Cookies Cleared**:
    - `token`: Removed from the browser.

- **Error**:
  - **Status**: 401
  - **Body**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

---

## CaptainRouter Endpoints

### 1. `POST /captain/register`

#### Description
Registers a new captain.

#### Middleware
- `Captainvalidation`: Validates the captain input before proceeding.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "token": "string",
      "captain": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
    ```
  - **Cookies**:
    - `token`: JWT token with `httpOnly` and `secure` options based on environment variables.

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 2. `POST /captain/login`

#### Description
Logs in an existing captain.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "token": "string",
      "captain": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
    ```

- **Error**:
  - **Status**: 401
  - **Body**:
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

---

### 3. `GET /captain/logout`

#### Description
Logs out the current captain and clears the authentication token.

#### Request
- **Headers**:
  - Cookie: `token=<JWT token>`
- **Body**: None

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```
  - **Cookies Cleared**:
    - `token`: Removed from the browser.

- **Error**:
  - **Status**: 401
  - **Body**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

---
# API Documentation: Location and Ride Endpoints

This document outlines the available endpoints for `LocationRouter` and `RideRouter` in your Express application, including their request and response formats.

## Base URLs
- Location-related endpoints are prefixed with `/location`.
- Ride-related endpoints are prefixed with `/ride`.

---

## LocationRouter Endpoints

### 1. `GET /location/user`

#### Description
Fetches geographical coordinates based on the provided location query.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Query Parameters**:
  - `location`: String representing the location to search for.

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "latitude": "number",
      "longitude": "number"
    }
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 2. `POST /location/get-distance`

#### Description
Calculates the distance and fare between two locations.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "pickUpLocation": "string",
    "destinationLocation": "string"
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "distance": "number",
      "fare": "number"
    }
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 3. `POST /location/get-suggestions`

#### Description
Provides location suggestions based on the input query.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "params": {
      "location": "string"
    }
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    [
      "location1",
      "location2",
      "location3"
    ]
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

## RideRouter Endpoints

### 1. `POST /ride/create-ride`

#### Description
Creates a new ride.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Query Parameters**:
  - `userId`: String representing the ID of the user creating the ride.
- **Body**:
  ```json
  {
    "rideDetails": "object"
  }
  ```

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Ride created successfully",
      "ride": "object"
    }
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 2. `POST /ride/confirm-ride`

#### Description
Confirms a ride.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Query Parameters**:
  - `rideId`: String representing the ID of the ride.
  - `captainId`: String representing the ID of the captain confirming the ride.

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Ride confirmed",
      "ride": "object"
    }
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 3. `GET /ride/confirm-otp`

#### Description
Confirms the OTP for a ride.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Query Parameters**:
  - `rideId`: String representing the ID of the ride.
  - `otp`: String representing the OTP provided by the user.

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "OTP confirmed",
      "ride": "object"
    }
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    ```

---

### 4. `POST /ride/finish-ride`

#### Description
Finishes a ride.

#### Request
- **Headers**:
  - Content-Type: `application/json`
- **Query Parameters**:
  - `rideId`: String representing the ID of the ride.
  - `captainId`: String representing the ID of the captain.

#### Response
- **Success**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Ride finished successfully",
      "ride": "object"
    }
    ```

- **Error**:
  - **Status**: 400
  - **Body**:
    ```json
    {
      "error": "string"
    }
    

