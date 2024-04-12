self.addEventListener('fetch', async (event) => {
  const urlToIntercept = 'https://restcountries.com/v3.1/alpha/co';
  if ([urlToIntercept].includes(event.request.url)) {
    return event.respondWith(
      (async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/alpha/co');
          return response;
        } catch (error) {
          console.log(error);
          const pages = await self.clients.matchAll();
          pages.forEach((page) => page.postMessage({ type: 'RELOAD_PAGE' }));
          return new Response('Fallback content', { status: 200 });
        }
      })()
    );
  }
  event.respondWith(fetch(event.request));
});
