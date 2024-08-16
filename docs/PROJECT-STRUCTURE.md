# Project Structure

This project is organized into modules, each with its own directory under the `src` directory. Shared resources are placed in the `src` directory.

## Why Choose NestJS and Modularity

NestJS is chosen for its TypeScript support, modular structure, integration with other libraries, and built-in testing utilities. It helps in creating efficient, reliable, and scalable server-side applications.

Modularity is chosen for its benefits in code organization, reusability, scalability, isolation, and team development. It separates the functionality of a program into independent, interchangeable modules, making the code easier to understand, maintain, and test.

## Directory Structure

```
src/
  dto/
    hotel.dto.ts
  hotels/
    hotels.module.ts
    hotels.controller.ts
    hotels.service.ts
    dto/
      create-hotel.dto.ts
      get-hotels-response.dto.ts
  external-supplier/
    external-supplier.module.ts
    external-supplier.service.ts
    strategies/
      supplier-strategies.ts
      supplier-strategy.interface.ts
      acme.strategy.ts
      patagonia.strategy.ts
      paperflies.strategy.ts
  utils/
    locale.utils.ts
```
## Shared DTOs

Shared Data Transfer Objects (DTOs) are placed in the `src/dto` directory. These DTOs can be used by any module in the project.

## Utils

Utility functions that are used across multiple modules are placed in the `src/utils` directory. For example, `locale.utils.ts` contains functions for transforming country locales.

## Hotels Module

The `hotels` module is responsible for managing hotels. It includes the following files:

- `hotels.module.ts`: Defines the module.
- `hotels.controller.ts`: Defines the API routes for the module.
- `hotels.service.ts`: Contains the business logic for the module.
- `dto/create-hotel.dto.ts`: Defines the shape of the data for creating a hotel.
- `dto/get-hotels-response.dto.ts`: Defines the shape of the data for the response when getting hotels.

## External Supplier Module

The `external-supplier` module is responsible for managing external suppliers. It includes the following files:

- `external-supplier.module.ts`: Defines the module.
- `external-supplier.service.ts`: Contains the business logic for the module.
- `strategies/supplier-strategies.ts`: Contains a list of strategies for handling different suppliers.
- `strategies/supplier-strategy.interface.ts`: Defines the interface that each supplier strategy must implement.
- `strategies/acme.strategy.ts`: Defines the strategy for handling the Acme supplier.
- `strategies/patagonia.strategy.ts`: Defines the strategy for handling the Patagonia supplier.
- `strategies/paperflies.strategy.ts`: Defines the strategy for handling the Paperflies supplier.