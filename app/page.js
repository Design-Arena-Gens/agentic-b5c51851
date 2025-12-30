'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [businessType, setBusinessType] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Friendly');
  const [goal, setGoal] = useState('Get leads');
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePosts = () => {
    if (!businessType || !audience) {
      alert('Please fill in business type and audience');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const generatedPosts = createPosts(businessType, audience, platform, tone, goal);
      setPosts(generatedPosts);
      setLoading(false);
    }, 800);
  };

  const createPosts = (business, aud, plat, ton, gl) => {
    const postIdeas = generatePostIdeas(business, aud, plat, ton, gl);
    const schedule = ['Monday 6 PM', 'Wednesday 6 PM', 'Friday 6 PM', 'Monday 10 AM', 'Thursday 7 PM', 'Saturday 11 AM', 'Tuesday 5 PM', 'Friday 9 AM'];

    return postIdeas.map((idea, idx) => ({
      day: schedule[idx] || `Day ${idx + 1}`,
      idea: idea.title,
      caption: idea.caption,
      hashtags: idea.hashtags.join(' ')
    }));
  };

  const generatePostIdeas = (business, audience, platform, tone, goal) => {
    const ideas = [
      {
        title: "Behind the scenes",
        caption: `Ever wonder what goes into ${business.toLowerCase()}? Here's a little peek behind the curtain. It's not always glamorous but it's always worth it 😊`,
        hashtags: ['#BehindTheScenes', '#SmallBusiness', `#${business.replace(/\s+/g, '')}`, '#RealTalk', '#DailyLife']
      },
      {
        title: "Customer spotlight",
        caption: `Shoutout to our amazing customers! You're literally the reason we do what we do. Thank you for trusting us with your ${business.toLowerCase()} needs 💙`,
        hashtags: ['#CustomerLove', '#ThankYou', '#Community', `#${audience.replace(/\s+/g, '')}`, '#Grateful']
      },
      {
        title: "Quick tip",
        caption: `Pro tip for ${audience.toLowerCase()}: This one thing changed everything for us and it might help you too. Sometimes the simplest solutions are the best ones.`,
        hashtags: ['#TipOfTheDay', '#LifeHack', `#${business.replace(/\s+/g, '')}Tips`, '#Learn', '#Growth']
      },
      {
        title: "Before & after",
        caption: `The transformation is real. This is what happens when you invest in quality ${business.toLowerCase()}. Results speak louder than words 👀`,
        hashtags: ['#BeforeAndAfter', '#Results', '#Transformation', `#${business.replace(/\s+/g, '')}`, '#Quality']
      },
      {
        title: "Common mistake",
        caption: `Let's talk about the biggest mistake people make when it comes to ${business.toLowerCase()}... We see this all the time and honestly it's so easy to avoid.`,
        hashtags: ['#MistakeToAvoid', '#Learning', '#Tips', `#${audience.replace(/\s+/g, '')}`, '#Education']
      },
      {
        title: "Team introduction",
        caption: `Meet the team! We're just regular people who happen to be really passionate about ${business.toLowerCase()}. Drop a 👋 if you want to get to know us better!`,
        hashtags: ['#MeetTheTeam', '#SmallBusiness', '#TeamWork', `#${business.replace(/\s+/g, '')}`, '#People']
      },
      {
        title: "Why we started",
        caption: `Real talk: We started this because we saw a gap in ${business.toLowerCase()} and thought we could do better. Three years later and we're still learning every day.`,
        hashtags: ['#OurStory', '#SmallBusinessOwner', '#Journey', '#Entrepreneurship', `#${business.replace(/\s+/g, '')}`]
      },
      {
        title: "Question for followers",
        caption: `Quick question for ${audience.toLowerCase()} - what's your biggest challenge right now? We're working on something new and want to make sure it actually helps you.`,
        hashtags: ['#Question', '#Community', '#Engagement', `#${audience.replace(/\s+/g, '')}`, '#LetsTalk']
      }
    ];

    return ideas.slice(0, 7 + Math.floor(Math.random() * 3));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Social Media Post Generator</h1>
        <p>Simple tool for small businesses to create authentic social media content</p>
      </header>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Business Type *</label>
          <input
            type="text"
            placeholder="e.g., Coffee Shop, Fitness Studio, Marketing Agency"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Target Audience *</label>
          <input
            type="text"
            placeholder="e.g., Young professionals, Parents, Local residents"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
              <option>Twitter</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option>Friendly</option>
              <option>Professional</option>
              <option>Bold</option>
              <option>Casual</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option>Get leads</option>
            <option>Build trust</option>
            <option>Increase engagement</option>
            <option>Educate audience</option>
          </select>
        </div>

        <button
          className={styles.button}
          onClick={generatePosts}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Posts'}
        </button>
      </div>

      {posts && (
        <div className={styles.results}>
          <h2>Your Content Calendar</h2>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Post Idea</th>
                  <th>Caption</th>
                  <th>Hashtags</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, idx) => (
                  <tr key={idx}>
                    <td>{post.day}</td>
                    <td><strong>{post.idea}</strong></td>
                    <td>{post.caption}</td>
                    <td className={styles.hashtags}>{post.hashtags}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.notes}>
            <h3>Notes for Client</h3>
            <ul>
              <li>Use real photos from your business when possible - people connect with authentic images way more than stock photos</li>
              <li>Don't stress about posting at exact times. The schedule is just a guide</li>
              <li>Feel free to adjust captions to match your voice. These are templates, not scripts</li>
              <li>Mix it up with videos, carousels, and stories between these main posts</li>
              <li>Respond to comments within the first hour if you can - engagement is huge</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
