Scope:
  - Authorization using Goggle Oauth 2 flow
  - Exchange Token (Goggle -> System JWT)
  - Authorization using system JWT
  - Express middleware
  - Docker on backend
  - React+vite on frontend

Out of scope:
  - Refresh token
  - Unit test
  - Database integration
  - Private routes
  - AWS Secret Manager integration
  - Error handling

Important:
  - To run this POC, provide a google api key (creating it on Goggle Developers Console) in `ui-core/constants/constants.js`
  - To start backend
    - `npm run dev` OR
    - `docker build . -t name_of_image` then `docker run -p 3000:3000 name_of_image`

![image](https://github.com/user-attachments/assets/6d4d643c-63c3-4d16-93fc-658efd5cd6d4)
