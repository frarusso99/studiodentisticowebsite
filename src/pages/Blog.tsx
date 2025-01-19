import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  return (
    <div id="blog" className="bg-gradient-to-b from-[#F0F3F5] to-[#ffffff] min-h-screen pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-manrope text-4xl md:text-5xl text-[#233539] mb-6">
            Il Nostro Blog
          </h1>
          <p className="font-manrope text-lg text-[#2E545D]">
            Scopri i nostri articoli e rimani aggiornato sulle ultime novità nel campo dell'odontoiatria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233539]/60 to-transparent z-10" />
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full text-sm font-medium text-white bg-[#4A828F] shadow-md backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-[#2E545D]/80 mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} lettura</span>
                  </div>
                  <h2 className="font-manrope text-xl font-bold text-[#233539] mb-4 group-hover:text-[#4A828F] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-[#2E545D]/80 line-clamp-3 mb-6">{post.subtitle}</p>
                  <div className="flex items-center text-[#4A828F] font-medium">
                    Leggi di più
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;