const kv = await Deno.openKv();

await kv.set(['myNumber'], { num: 0 });

Deno.serve(async (req: Request) => {
  const path = req.url.split('/')[3];
  const res = await kv.get(['myNumber']);
  const previousNum = res.value.num as number;
  let numToShow = previousNum;

  if (path === 'increment') {
    numToShow = previousNum + 1;
    await kv.set(['myNumber'], { num: numToShow });
  }
  if (path === 'decrement') {
    numToShow = previousNum - 1;
    await kv.set(['myNumber'], { num: numToShow });
  }

  return new Response(`Hello Lisa, here is a persisted number: ${numToShow}`);
});
