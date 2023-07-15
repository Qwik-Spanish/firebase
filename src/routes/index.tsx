import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Firestore, Timestamp, addDoc, collection } from "firebase/firestore";
import { appEnvironments } from "~/config/envs";
import { IFirestoreEnvs, db } from "~/db/firebase";

export default component$(() => {
  const env = useSignal<{
    example: any;
    data: IFirestoreEnvs;
  }>();

  const database = useStore({ data: {} as Firestore });
  useTask$(async ({ track }) => {
    track(() => env);
    env.value = await appEnvironments();
    console.log(env.value.example);

    // Initialize database data
    database.data = db(env.value?.data);
  });

  const handleSubmit = $(async (e: any) => {
    e.preventDefault();
    try {

      // Simple example to add document
      const result = await addDoc(collection(database.data, "contacts"), {
        name: "Anartz",
        lastname: "Mugika Ledo",
        birthday: new Date("1986-01-10").toISOString(),
        email: "mugan86@gmail.com",
        website: "https://anartz-mugika.com",
        social: {
          twitter: "mugan86",
          github: "mugan86",
          ig: "",
          discord: "mugan86",
        },
        created: Timestamp.now(),
      });

      if (result) {
        console.log("OK", "Operation OK");
      }
    } catch (err) {
      alert(err);
    }
  });
  return (
    <>
      <h1>Hi {env.value?.example}👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
      <button onClick$={handleSubmit}> Añadir primer contacto</button>
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
