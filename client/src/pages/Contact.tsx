import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles, MessageSquare } from 'lucide-react';
import SEO from '@/components/SEO';
import PixelBackground from '@/components/PixelBackground';
import LazyImage from '@/components/LazyImage';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minecraftImage, setMinecraftImage] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    setMinecraftImage('https://media.tenor.com/qiMsFYfPu-wAAAAi/anime-hello.gif');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      toast({
        title: "Configuration Error!",
        description: "Contact form is not properly configured. Please contact the site administrator.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (response.status === 200) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out! I'll get back to you super soon~",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Oopsie!",
          description: result.message || "Something went wrong. Please try again!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      <SEO 
        title="Contact - notsopreety"
        description="Get in touch with me! Drop a message and let's chat about projects, collaborations, or just say hi!"
        keywords="samir badaila, samir thakuri, notsopreety, code, dev, programming, github, developer, portfolio, projects, react, javascript, typescript, contact, get in touch, message, collaboration, reach out"
      />
      <PixelBackground />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              style={{ fontFamily: 'minecraft, monospace' }}
            >
              Let's Chat!
            </h1>
          </div>
          <p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            "Got questions? Ideas? Just wanna say hi? Drop me a message and I'll get back to you faster than a creeper explosion!"
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="animate-slide-in-left">
            <Card className="bg-card/80 backdrop-blur-xl border-card-border p-6 sm:p-8 transition-smooth hover:shadow-2xl relative overflow-visible">

              {/* Minecraft Character Overlay */}
              {minecraftImage && (
                <div
                  className="
                    absolute 
                    -top-3 
                    right-0 
                    sm:right-3 
                    md:-right-4 
                    w-20 
                    h-25 
                    sm:w-24 
                    sm:h-28 
                    md:w-28 
                    md:h-28 
                    pointer-events-none 
                    z-10
                  "
                  // 💬 To adjust image size or position:
                  // - Change `w-20`, `h-20` for mobile size
                  // - Change `sm:w-24 sm:h-24 md:w-28 md:h-28` for tablet/desktop size
                  // - Adjust `right-0 sm:right-3 md:right-6` to move it horizontally
                  // - Adjust `-top-3` to control vertical positioning
                >
                  <LazyImage
                    src={minecraftImage}
                    alt="Minecraft character"
                    className="w-full h-full object-contain pixelated"
                    // ⚠️ Skeleton loading removed — image loads directly
                    testId="img-minecraft-character"
                    fallbackIcon={false}
                  />
                </div>
              )}

              <h2 
                className="text-2xl font-bold mb-6 text-foreground"
                style={{ fontFamily: 'Silkscreen, monospace' }}
              >
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Silkscreen, monospace' }}>
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Yooour naaaame~?"
                    required
                    className="bg-background/50 border-input font-mono"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Silkscreen, monospace' }}>
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="bg-background/50 border-input font-mono"
                  />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Silkscreen, monospace' }}>
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's on your mind?"
                    required
                    className="bg-background/50 border-input font-mono"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Silkscreen, monospace' }}>
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here... Don't be shy!"
                    required
                    className="bg-background/50 border-input font-mono min-h-[150px] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-bold text-base gap-2"
                  size="lg"
                  style={{ fontFamily: 'Silkscreen, monospace' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
