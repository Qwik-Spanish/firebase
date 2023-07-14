import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, type DocumentHead, } from "@builder.io/qwik-city";

export const serverFunction = server$(function () {
  const envPrivateValue = this.env.get('DB_PRIVATE_KEY');
  // `this` is the `RequestEvent` object
  console.log(envPrivateValue);
  return envPrivateValue || '';
});

export default component$(() => {
  const env = useSignal('');
  useTask$(async () => {
    env.value = await serverFunction() ;
    console.log(env.value);
  })
  return (
    <>
      <h1>Hi { env.value }👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
