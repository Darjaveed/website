/**
 * Reviews Page
 * Placeholder page for student reviews and testimonials
 */

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      course: "Full Stack Web Development",
      rating: 5,
      comment: "Excellent course! The instructors were knowledgeable and the content was up-to-date. Highly recommend!"
    },
    {
      id: 2,
      name: "Michael Chen",
      course: "Data Science & Analytics",
      rating: 5,
      comment: "This program helped me transition into data science. The practical projects were invaluable."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      course: "UI/UX Design Fundamentals",
      rating: 4,
      comment: "Great introduction to design principles. The course material was well-structured and easy to follow."
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Reviews</h1>
          <p className="text-gray-600 text-lg">See what our students are saying about our courses</p>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-gray-600 text-sm">{review.course}</p>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

