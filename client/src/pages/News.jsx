/**
 * News Page
 * Placeholder page for news and updates
 */

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "New Course Launch: Advanced Data Science",
      date: "March 15, 2024",
      excerpt: "We're excited to announce our new advanced data science program..."
    },
    {
      id: 2,
      title: "Platform Updates and Improvements",
      date: "March 10, 2024",
      excerpt: "We've made several improvements to enhance your learning experience..."
    },
    {
      id: 3,
      title: "Student Success Stories",
      date: "March 5, 2024",
      excerpt: "Read about how our students are transforming their careers..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-gray-600 text-lg">Stay updated with the latest news from our platform</p>
        </div>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time>{item.date}</time>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h2>
              <p className="text-gray-600">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

