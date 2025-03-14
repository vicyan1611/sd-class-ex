# Single Responsibility Principle (SRP) and DRY Violations Analysis

After reviewing the project, I've identified several violations of the Single Responsibility Principle (SRP) and Don't Repeat Yourself (DRY) principle. Here's a comprehensive analysis:

## Single Responsibility Principle Violations

### Backend

1. **`studentRoutes.ts`**:
   - The file handles too many responsibilities: CRUD operations, validation rules, and business logic for student deletions.
   - The delete endpoint specifically checks configuration settings and implements business rules directly in the route handler.

2. **`Student.model.ts`**:
   - The model defines associations with other models (Faculty, Program, Status) which could be separated into a dedicated file for model associations.

3. **`seeders/initialData.ts`**:
   - This file is responsible for both defining initial data and seeding it, which could be split into separate concerns.

4. **`index.ts`**:
   - The main file initializes the database, sets up routes, starts the server, and calls data initialization.

5. **`database.ts`**:
   - Both creates the Sequelize instance and tests the connection in the same file.

### Frontend

1. **`HomePage/index.tsx`**:
   - This component handles too many responsibilities: state management, API calls, search functionality, UI rendering, and managing multiple dialogs.

2. **`ManagementSettings/index.tsx`**:
   - Manages state and API interactions for three different entities (faculties, programs, statuses).

3. **`StudentForm.tsx`**:
   - Performs both form rendering and validation logic.

4. **`ConfigurationPage/index.tsx`**:
   - Manages all configuration settings and status transitions in a single component.

5. **`StatusCertificateDialog.tsx`**:
   - Handles both UI presentation and certificate generation/export functionality.

6. **`dataUtils.ts`**:
   - Contains both import and export functionality for different file formats.

## DRY Violations

### Backend

1. **Error handling pattern repeated**:
   - Similar try-catch blocks with nearly identical error handling appear in multiple route files.

2. **Model validation patterns**:
   - Similar validation patterns are repeated across different models.

3. **Route implementations**:
   - CRUD operations follow the same pattern across different route files without extracting common functionality.

4. **Student deletion check**:
   - The logic to check if a student can be deleted based on creation date is not abstracted and could be duplicated if needed elsewhere.

### Frontend

1. **API call patterns**:
   - Similar patterns for fetching, updating, and handling errors are repeated across components.

2. **Form handling**:
   - Similar form submission and validation logic in multiple components.

3. **Dialog handling**:
   - Similar code for opening/closing dialogs repeated in different components.

4. **Duplication in Export Functions**:
   - `exportToHTML` and `exportToMarkdown` in `StatusCertificateDialog.tsx` have significant overlap.

5. **List rendering**:
   - Similar patterns for rendering lists of faculties, programs, and statuses in `ManagementSettings`.

6. **Input handling**:
   - Multiple similar input handlers in different components.

7. **UI element styles**:
   - Similar UI styling code repeated across components rather than using shared style components.

## Critical issues:

1. **Data validation spread across layers**:
   - Validation logic appears in both frontend and backend, which could lead to inconsistencies.

2. **Business rules not centralized**:
   - Business rules like status transitions and deletion time windows are scattered across components.

3. **Error handling is inconsistent**:
   - Different approaches to error handling across the application.

4. **API service pattern lacking**:
   - No centralized service layer for API interactions, leading to duplicated API call patterns.

I will focus on refactoring these areas to improve the maintainability, readability, and scalability of the application.

## What I changed
### 1. Added API Service Layer

I implemented a centralized API service layer to handle all API interactions in the frontend. This addresses one of the most critical DRY violations in the project:

#### Created Core API Client
- Implemented a base `apiClient.ts` that handles common functionality like request/response management and error handling.
- Centralized error handling within the client to ensure consistent error management.

#### Created Domain-Specific Services
- Added specific service modules for each entity (students, faculties, programs, statuses, etc.)
- Each service encapsulates all API operations related to that domain

#### Implemented Simplified useApi Hook
I added a streamlined `useApi` hook that separates API state management from component logic:

```typescript
// src/hooks/useApi.ts
import { useState, useCallback } from 'react';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <R>(
    apiFunction: () => Promise<R>
  ): Promise<R | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFunction();
      setData(result as unknown as T);
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  return { data, isLoading, error, request };
}
```

This hook provides:
- Loading state management
- Error handling
- Data fetching
- A flexible interface that works with any API function

### Next Steps for Refactoring

I plan to continue the refactoring process by addressing the following violations:

1. **Backend SRP Violations**:
   - Separate business logic from route handlers in `studentRoutes.ts`
   - Create a dedicated file for model associations
   - Split data definition and seeding in `initialData.ts`

2. **Frontend Component Refactoring**:
   - Break down large components like `HomePage` and `ManagementSettings`
   - Create reusable form components and validation utilities
   - Extract dialog management into custom hooks

3. **Centralize Business Rules**:
   - Create dedicated services for business rules like status transitions and time windows
   - Apply consistent validation across the application

4. **Improve Error Handling**:
   - Standardize error handling throughout the application
   - Create reusable error components and utilities
