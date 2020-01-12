import App from './components/App.svelte'

// Redirect for gh-pages
// https://www.smashingmagazine.com/2016/08/sghpa-single-page-app-hack-github-pages/
(() => {
  const redirect = sessionStorage.redirect
  delete sessionStorage.redirect
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect)
  }
})()

const app = new App({
  target: document.body
})

export default app
