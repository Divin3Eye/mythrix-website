import React from 'react';
import MarketingLayout from '../components/MarketingLayout';

export default function About() {
  return (
    <MarketingLayout>
      <div className="relative z-10 flex flex-col items-center pt-24 px-6 md:px-16 pb-32 w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-12">
          Why Mythrix Exists
        </h1>
        
        <div className="space-y-8 text-lg md:text-xl text-zinc-400 font-light leading-relaxed text-left">
          <p>
            The volume of human knowledge is expanding exponentially, yet our tools for synthesizing it remain stuck in the past. We still use generic note-taking apps designed for groceries to organize complex academic research.
          </p>
          <p>
            When researching a deep topic, the friction is rarely finding information—it's connecting it. Traditional folders and keyword searches fail when dealing with semantic concepts scattered across dozens of PDFs.
          </p>
          <p>
            We built Mythrix because we believe the future of knowledge work isn't just about storing files, but about <span className="text-white font-medium">interacting with the ideas inside them</span>.
          </p>
          <p>
            Mythrix acts as a cognitive extension. It reads your sources, understands the context, and helps you draw connections that would take hours of manual reading to uncover. Crucially, it does this without hallucination—every insight is firmly grounded in your provided texts, complete with verifiable citations.
          </p>
          <p>
            Our mission is to accelerate human discovery by building the ultimate operating system for deep research.
          </p>
        </div>
      </div>
    </MarketingLayout>
  );
}
