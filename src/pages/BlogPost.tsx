
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { IoArrowBack } from 'react-icons/io5';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    navigate('/blog');
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-[#F0F3F5] to-[#ffffff] min-h-screen pt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Link to go back */}
        <Link
          to="/blog"
          className="inline-flex items-center text-[#2E545D] hover:text-[#1F3C44] mb-8 font-medium group"
        >
          <IoArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" /> Torna al blog
        </Link>

        {/* Main content */}
        <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-10 space-y-8">
          <div className="relative mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[50vh] object-cover rounded-2xl shadow-md"
            />
            <span className="absolute top-4 right-4 text-white text-lg font-medium bg-[#4A828F]/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              {post.category}
            </span>
          </div>

          {/* Title and post details */}
          <h1 className="font-manrope text-3xl md:text-4xl font-bold text-[#233539] tracking-tight">{post.title}</h1>
          <div className="flex items-center text-sm text-[#2E545D]/80 space-x-4">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} lettura</span>
          </div>

          {/* Post subtitle */}
          <p className="font-manrope text-lg md:text-xl text-[#2E545D] mt-4">{post.subtitle}</p>

          {/* Main content */}
          <div
            className="prose prose-lg mt-6 text-[#2E545D] font-manrope prose-headings:text-[#233539] prose-a:text-[#4A828F]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
