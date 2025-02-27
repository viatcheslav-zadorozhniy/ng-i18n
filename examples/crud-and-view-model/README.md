# CRUD Service Examples

This repository demonstrates different implementations of CRUD services using a modular and abstracted approach.

## Overview

The examples in this folder illustrate:
- A base abstraction of a CRUD service ([BaseCrud](base/base-crud.ng.ts)).
- Base implementations of the CRUD service using:
  - A REST API ([BaseCrudRest](base/rest/base-crud-rest.ng.ts)).
  - Firebase Firestore ([BaseCrudFirestore](base/firestore/base-crud-firestore.ng.ts)).
- A concrete example using the abstractions: the [UserCrud](user/user-crud.ng.ts) example.

## Examples

### Base Abstraction of the CRUD Service
Defines the contracts and common logic for any CRUD service. This abstraction allows seamless integration with any backend or database.

### Base Implementations of the CRUD Service
- **REST API Implementation:** Uses HTTP requests to perform CRUD operations.
- **Firebase Firestore Implementation:** Leverages Firebase Firestore for database interactions.

### UserCrud Example
Demonstrates how to extend the base abstractions to handle user-related data. This example serves as a practical implementation of the CRUD service design.

## Getting Started

1. Review the base abstraction to understand the common interface.
2. Examine the REST and Firestore implementations.
3. Explore the [UserCrud](user/user-crud.ng.ts) example to see how these abstractions can be applied in a real-world scenario.

## Usage

Adjust the configurations as needed for your project:
- For REST API usage, ensure that the required endpoints are accessible.
- For Firebase Firestore, configure your Firebase project credentials.
