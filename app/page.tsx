import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Get AI prompts</h1>
      <br className="max-md:hidden"></br>
      <span className="purple_gradient text-center head_text">
        AI-powered prompts
      </span>
      <p className="desc text-center">
        Unikprompts is an open-source AI prompting tool for modern world to
        find, create, and share different prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
