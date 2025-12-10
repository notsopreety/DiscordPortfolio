
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
      
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      setUser(userData);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();
      
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
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <SiGithub className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 animate-pulse text-primary" />
              <p className="text-sm sm:text-base text-muted-foreground font-mono">Loading GitHub data...</p>
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
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12">
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="bg-destructive/10 border-destructive/50 p-4 sm:p-6 max-w-md mx-3">
              <h2 className="text-lg sm:text-xl font-bold text-destructive mb-2">Error Loading GitHub Data</h2>
              <p className="text-sm text-muted-foreground">{error}</p>
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

      <div className="container max-w-6xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <SiGithub className="w-8 h-8 sm:w-10 sm:h-10 text-foreground" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              GitHub
            </h1>
          </div>
          <p 
            className="text-sm sm:text-base text-muted-foreground italic"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            "My code playground where magic happens~ ✨"
          </p>
        </div>

        {/* Profile Card - Compact */}
        {user && (
          <Card className="bg-card/80 backdrop-blur-xl border-card-border p-3 sm:p-4 md:p-5 mb-6 sm:mb-8 animate-slide-in-left">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <img 
                src={user.avatar_url}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg object-cover border-2 border-primary/20 mx-auto sm:mx-0"
              />
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-poppins">{user.name}</h2>
                  <a 
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-primary hover:underline inline-flex items-center gap-1 justify-center sm:justify-start"
                  >
                    @{user.login}
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
                
                {user.bio && (
                  <p className="text-xs sm:text-sm text-muted-foreground" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {user.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm justify-center sm:justify-start">
                  {user.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.blog && (
                    <a 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{user.blog}</span>
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-mono justify-center sm:justify-start">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                    <span className="font-bold">{user.followers}</span>
                    <span className="text-muted-foreground hidden xs:inline">followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                    <span className="font-bold">{user.following}</span>
                    <span className="text-muted-foreground hidden xs:inline">following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                    <span className="font-bold">{user.public_repos}</span>
                    <span className="text-muted-foreground hidden xs:inline">repos</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="relative flex items-center mb-4 sm:mb-6">
            <div className="flex-grow border-t border-muted-foreground/30"></div>
            <h3 
              className="px-3 text-xs sm:text-sm font-mono text-muted-foreground tracking-wider"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Projects ({repos.length})
            </h3>
            <div className="flex-grow border-t border-muted-foreground/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {repos.map((repo, index) => (
              <Card 
                key={repo.id}
                className="bg-card/80 backdrop-blur-xl border-card-border p-3 sm:p-4 hover-elevate transition-smooth hover:shadow-xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title inline-flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-smooth flex-1 min-w-0"
                    >
                      <h3 className="text-base sm:text-lg font-bold font-poppins truncate">
                        {repo.name}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 group-hover/title:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  </div>

                  {repo.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge 
                          key={topic}
                          variant="secondary"
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-primary/10 hover:bg-primary/20 transition-smooth"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 4 && (
                        <Badge 
                          variant="secondary"
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-primary/10"
                        >
                          +{repo.topics.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground font-mono">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span 
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="truncate max-w-[80px] sm:max-w-none">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <GitFork className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{repo.forks_count}</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 hidden sm:flex">
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{repo.watchers_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-muted-foreground/70 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="truncate">Updated {formatDate(repo.updated_at)}</span>
                    </div>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline flex-shrink-0"
                      >
                        <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {repos.length === 0 && (
            <div className="text-center py-12">
              <Code className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-sm sm:text-base text-muted-foreground font-mono">No repositories found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
