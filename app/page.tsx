import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">Welcome</h1>
      {/* <p className="mb-6 text-lg">
        This is where I chronicle my journey through life, work, and ideas.
        Expect a mix of personal reflections, project insights, and thoughts on
        the books shaping my perspective.
      </p> */}
      <p className="mb-8 text-lg">
        Whether you're here for inspiration, shared experiences, or simply
        curious about my world, I hope you'll find something that resonates.
      </p>
      <h2 className="mb-4 text-2xl font-semibold">Latest Entries</h2>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
