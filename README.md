<h1 align="center">
  TUCMC Authentication Service
</h1>

<p align="center">
Easily implement authentication in your website with TUCMC's authentication system.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tucmc-auth"><img src="https://img.shields.io/npm/v/tucmc-auth?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/tucmc-auth"><img src="https://img.shields.io/npm/dm/tucmc-auth?style=flat-square"></a>
</p>

## User Data

Below is the data you'll get from a logged in user.

```ts
{
  studentID: string,
  title: string,
  firstname: string,
  lastname: string,
  email: string
}
```

## Implementation

### React / Next.js

User data can be accessed with our [React Context](https://reactjs.org/docs/context.html) by wrapping the app with it.

#### `_app.js` or `_app.tsx`


```jsx
import { AuthProvider } from "tucmc-auth"

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <AuthProvider TOKEN="-----TOKEN-----">
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  )

}

export default MyApp
```

Then, use the `useAuth` hook to access all the user data from anywhere.

#### `pages/index.js` or `pages/index.tsx`

```jsx
import { useAuth, SignInWithTUCMC } from 'tucmc-auth'

const Index = () => {
  const { userData, signOut } = useAuth()

  return (
    <div>
      { userData && <h1>Hi, {userData.firstname}</h1> }
      <SigninWithTUCMC/>
    </div>
  )
}

export default Index
```

### Pure Javascript / CDN

For non-react projects.

#### Links to the CDN files

CSS
```
https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-style.min.css
```

JS
```
https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-lib.min.js
```

#### 1. Include all required libraries

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-style.min.css"/>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-lib.min.js"></script>
<script async src="//cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js" onload="init()"></script>
```

#### 2. Setup a script

```html
<script>
  const auth = new TUCMCAuth("-----TOKEN-----");

  window.onload = function () {
    const sessionData = auth.user();

    // If session is valid, update an element with userdata.
    if (sessionData) {
      document.getElementById("email").innerText = `Logged in as: {sessionData.email}`;
    } else {
      document.getElementById("email").innerText = "";
    }
  }
</script>
```

### 3. Add sign-in button
```html
<!-- Display data here -->
<p id="email"></p>

<!-- Login button - must have the class "tucmc-login" -->
<button class="tucmc-login">Login with TUCMC</button>

<!-- Custom Login Button-->
<button onclick="auth.login()">Login</button>

<!-- Logout button -->
<button onclick="auth.logout()">logout</button>
```

<p align="center">
made with ♥ by Triam Udom Clubs Management Committee
</p>