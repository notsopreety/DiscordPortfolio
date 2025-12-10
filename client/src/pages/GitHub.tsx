
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GitFork, Star, Eye, Code, Calendar, MapPin, Users, Link as LinkIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import SEO from '@/components/SEO';
import PixelBackground from '@/components/PixelBackground';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export default function GitHub() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = 'notsopreety';

  useEffect(() => {
    document.body.style.overflow = 'auto';
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();
      
      // Sort by stars and updated date
      const sortedRepos = reposData
        .filter((repo: GitHubRepo) => !repo.name.includes('notsopreety'))
        .sort((a: GitHubRepo, b: GitHubRepo) => {
          const starsA = a.stargazers_count;
          const starsB = b.stargazers_count;
          if (starsB !== starsA) return starsB - starsA;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
      
      setRepos(sortedRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      Python: '#3776AB',
      HTML: '#E34F26',
      CSS: '#1572B6',
      Java: '#007396',
      'C++': '#00599C',
      C: '#A8B9CC',
      PHP: '#777BB4',
      Ruby: '#CC342D',
      Go: '#00ADD8',
      Rust: '#000000',
      Shell: '#89E051',
    };
    return colors[language || ''] || '#858585';
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden page-transition">
        <PixelBackground />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <SiGithub className="w-16 h-16 mx-auto mb-4 animate-pulse text-primary" />
              <p className="text-lg text-muted-foreground font-mono">Loading GitHub data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden page-transition">
        <PixelBackground />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="bg-destructive/10 border-destructive/50 p-6 max-w-md">
              <h2 className="text-xl font-bold text-destructive mb-2">Error Loading GitHub Data</h2>
              <p className="text-muted-foreground">{error}</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      <SEO 
        title="GitHub Projects - notsopreety"
        description="Check out my GitHub projects and repositories. I code and build cool stuff!"
        keywords="samir badaila, notsopreety, github, projects, repositories, code, developer, programming"
      />
      <PixelBackground />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <SiGithub className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
              GitHub
            </h1>
          </div>
          <p 
            className="text-base sm:text-lg text-muted-foreground italic"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            "My code playground where magic happens~ ✨"
          </p>
        </div>

        {/* Profile Card */}
        {user && (
          <Card className="bg-card/80 backdrop-blur-xl border-card-border p-4 sm:p-6 mb-8 animate-slide-in-left">
            <div className="flex flex-col sm:flex-row gap-6">
              <img 
                src={user.avatar_url}
                alt={user.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-2 border-primary/20"
              />
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold font-poppins mb-1">{user.name}</h2>
                  <a 
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    @{user.login}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                {user.bio && (
                  <p className="text-muted-foreground" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {user.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  {user.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.blog && (
                    <a 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>{user.blog}</span>
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm font-mono">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold">{user.followers}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold">{user.following}</span>
                    <span className="text-muted-foreground">following</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold">{user.public_repos}</span>
                    <span className="text-muted-foreground">repos</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-muted-foreground/30"></div>
            <h3 
              className="px-4 text-sm sm:text-base font-mono text-muted-foreground tracking-wider"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Projects ({repos.length})
            </h3>
            <div className="flex-grow border-t border-muted-foreground/30"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {repos.map((repo, index) => (
              <Card 
                key={repo.id}
                className="bg-card/80 backdrop-blur-xl border-card-border p-4 sm:p-5 hover-elevate transition-smooth hover:shadow-xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title inline-flex items-center gap-2 hover:text-primary transition-smooth"
                      >
                        <h3 className="text-lg font-bold font-poppins truncate">
                          {repo.name}
                        </h3>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                      {repo.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 5).map((topic) => (
                        <Badge 
                          key={topic}
                          variant="secondary"
                          className="text-xs bg-primary/10 hover:bg-primary/20 transition-smooth"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{repo.watchers_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>View Demo</span>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {repos.length === 0 && (
            <div className="text-center py-12">
              <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground font-mono">No repositories found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
