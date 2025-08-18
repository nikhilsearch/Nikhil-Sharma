import React from 'react';
import { Facebook, Twitter, Linkedin, Share, Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SocialSharingProps {
  title: string;
  excerpt?: string;
  url: string;
  className?: string;
}

export const SocialSharing: React.FC<SocialSharingProps> = ({
  title,
  excerpt,
  url,
  className = ''
}) => {
  const { toast } = useToast();

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600 hover:text-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-sky-500 hover:text-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700 hover:text-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600 hover:text-green-700',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
    },
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The blog post link has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the link manually.',
        variant: 'destructive',
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      } catch (error) {
        console.log('Native sharing failed:', error);
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Share className="w-5 h-5" />
          Share this post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.name}
                variant="outline"
                size="sm"
                className={`${option.color} border-current hover:bg-current hover:text-white transition-colors`}
                onClick={() => handleShare(option.url)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {option.name}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-700 border-current hover:bg-current hover:text-white"
            onClick={copyToClipboard}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>

          {navigator.share && (
            <Button
              variant="outline"
              size="sm"
              className="text-purple-600 hover:text-purple-700 border-current hover:bg-current hover:text-white"
              onClick={handleNativeShare}
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};