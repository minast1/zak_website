import FlipBookWrapper from "@/components/home/flip-book";
import Image from "next/image";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <FlipBookWrapper />
    // </main>
    <div>
      {/* <!-- Hero Section --> */}
      <section className="relative bg-cover font-sans bg-center bg-no-repeat h-[500px] bg-[url('/imgs/ban2.jpg')]">
        <div className="w-full bg-lime-400 h-2"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sankofa Sustainability
            </h1>
            <p className="text-xl mb-6">
              Reclaiming wisdom, redefining sustainability
            </p>
            <button className="bg-lime-500 text-black font-semibold px-6 py-3 rounded hover:bg-lime-600">
              Read Latest Issue
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Highlights Section --> */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-8">Highlights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img
              src="https://images.unsplash.com/photo-1581092334650-08f5782f769c"
              alt="Solar panels"
              className="rounded-lg mb-4"
            />
            <p className="text-lime-600 font-medium">Cover Story</p>
            <h3 className="text-lg font-semibold">
              Africa's ESG Awakening: Challenges and Opportunities
            </h3>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581090464777-573b68d7b6e4"
              alt="City skyline"
              className="rounded-lg mb-4"
            />
            <p className="text-lime-600 font-medium">ESG Tracker</p>
            <h3 className="text-lg font-semibold">
              How Companies Across Africa Are Embracing ESG
            </h3>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1604537466573-37f0e77cf0eb"
              alt="Young woman"
              className="rounded-lg mb-4"
            />
            <p className="text-lime-600 font-medium">Green Futures</p>
            <h3 className="text-lg font-semibold">
              Young Innovators Transforming Africa’s Green Economy
            </h3>
          </div>
        </div>

        {/* <!-- About Section --> */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-lime-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              About Sankofa Sustainability
            </h3>
            <p className="mb-4">
              Sankofa Sustainability is Africa’s independent voice on
              environmental sustainability. Climate change, and ESG
              accountability. Rooted in indigenous wisdom and committed to
              future-facing innovation, we tell data-driven, human-centered
              stories that bridge policy, practice, and purpose.
            </p>
            <button className="bg-lime-500 text-black font-semibold px-4 py-2 rounded hover:bg-lime-600">
              Learn More
            </button>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1628890920172-7f6cbfe6a6f3"
              alt="Elder with plant"
              className="rounded-lg mb-4"
            />
            <p className="text-lime-600 font-medium">Sankofa Wisdom</p>
            <h3 className="text-lg font-semibold">
              Traditional Practices for Environmental Stewardshipp
            </h3>
          </div>
        </div>
      </section>

      {/* <!-- Newsletter Section --> */}
      <section className="bg-gray-100 py-10 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">
          Subscribe to our newsletter
        </h2>
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/2"
          />
          <button className="bg-lime-500 text-black px-6 py-2 rounded hover:bg-lime-600 font-semibold">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
