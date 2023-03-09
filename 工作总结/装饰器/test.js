let url = 'xx/xx/:id/xx/:name';

// console.log((/\:([^\/]*)\//g).exec(url)[1]);
console.log(url.match(/\:([^\/]+)/g));