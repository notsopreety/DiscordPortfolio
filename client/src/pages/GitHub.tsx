import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GitFork, Star, Eye, Code, Calendar, MapPin, Users, Link as LinkIcon, ChevronDown } from 'lucide-react';
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

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repository: {
    name: string;
    full_name: string;
  };
}

export default function GitHub() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'stars' | 'updated'>('stars');
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
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`
      );
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();

      const filteredRepos = reposData.filter((repo: GitHubRepo) => !repo.name.includes('notsopreety'));
      setRepos(filteredRepos);

      try {
        const eventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=50`
        );
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          const pushEvents = eventsData
            .filter((event: any) => event.type === 'PushEvent')
            .map((event: any) => {
              // Get the commit SHA from the payload head
              const commitSha = event.payload?.head || '';
              // Extract commit message from the first commit in the payload if available
              const firstCommit = event.payload?.commits?.[0];
              const commitMessage = firstCommit?.message || 'Push to repository';

              return {
                sha: commitSha,
                commit: {
                  message: commitMessage,
                  author: {
                    name: event.actor.login,
                    date: event.created_at,
                  },
                },
                html_url: `https://github.com/${event.repo.name}/commit/${commitSha}`,
                repository: {
                  name: event.repo.name.split('/')[1],
                  full_name: event.repo.name,
                },
              };
            })
            .filter((commit: any) => commit.sha)
            .slice(0, 5);
          setCommits(pushEvents);
        }
      } catch (commitError) {
        console.error('Failed to fetch commits:', commitError);
        setCommits([]);
      }
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
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12">
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
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12">
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

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12">
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

        {/* Profile Card - Redesigned */}
        {user && (
          <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-card-border p-4 sm:p-6 mb-6 sm:mb-8 animate-slide-in-left hover-elevate transition-smooth relative overflow-hidden group">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="mx-auto md:mx-0">
                <div className="relative">
                  <img 
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-primary/30 shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                    <SiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-poppins bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {user.name}
                  </h2>
                  <a 
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg text-primary hover:text-primary/80 inline-flex items-center gap-1.5 font-mono transition-colors"
                  >
                    @{user.login}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {user.bio && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {user.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm justify-center md:justify-start">
                  {user.location && (
                    <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.blog && (
                    <a 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span className="truncate max-w-[150px]">{user.blog}</span>
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 text-sm font-mono justify-center md:justify-start pt-2">
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 justify-center md:justify-start">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{user.followers}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">followers</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 justify-center md:justify-start">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{user.following}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">following</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 justify-center md:justify-start">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{user.public_repos}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">repositories</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Commits Section */}
        {commits.length > 0 && (
          <div className="mb-6 sm:mb-8 animate-slide-in-right">
            <div className="relative flex items-center mb-4">
              <div className="flex-grow border-t border-muted-foreground/30"></div>
              <h3 
                className="px-3 text-xs sm:text-sm font-mono text-muted-foreground tracking-wider"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Recent Commits ({commits.length})
              </h3>
              <div className="flex-grow border-t border-muted-foreground/30"></div>
            </div>

            <Card className="bg-card/80 backdrop-blur-xl border-card-border p-4 sm:p-5">
              <div className="space-y-3">
                {commits.map((commit, index) => (
                  <a
                    key={commit.sha}
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/30 transition-all group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs font-mono bg-primary/20 text-primary border-primary/30">
                            {commit.repository.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">
                            {formatDate(commit.commit.author.date)}
                          </span>
                        </div>
                        <p className="text-sm font-mono text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {commit.commit.message.split('\n')[0]}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground font-mono">
                            {commit.sha.substring(0, 7)}
                          </span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
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

          {/* Sorting Controls */}
          <div className="flex justify-end mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'stars' | 'updated')}
                className="relative appearance-none bg-card/90 backdrop-blur-xl border-2 border-card-border rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 pr-10 sm:pr-12 text-xs sm:text-sm font-mono text-foreground hover:border-primary/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <option value="stars">⭐ Most Stars</option>
                <option value="updated">🕒 Latest Updated</option>
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary/80 transition-colors" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[...repos].sort((a, b) => {
              if (sortBy === 'stars') {
                if (b.stargazers_count !== a.stargazers_count) {
                  return b.stargazers_count - a.stargazers_count;
                }
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
              } else {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
              }
            }).map((repo, index) => (
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