import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Welcome</h1>
        {/* <p className="mb-6 text-lg">
          This is where I chronicle my journey through life, work, and ideas.
          Expect a mix of personal reflections, project insights, and thoughts on
          the books shaping my perspective.
        </p> */}
        <p>
          Whether you're here for inspiration, shared experiences, or simply
          curious about my world, I hope you'll find something that resonates.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Latest Entries</h2>
        <BlogPosts />
      </section>
    </div>
  );
}
