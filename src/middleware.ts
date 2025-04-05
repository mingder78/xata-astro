export function onRequest({ request, redirect }, next) {
  const url = new URL(request.url);
  if (url.pathname === '/curd') {
    return redirect('/swagger', 301);
  }
  return next(); // Continue to the requested page if no redirect
}
