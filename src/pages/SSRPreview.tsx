import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Copy, ExternalLink, RefreshCw, Eye, Code2, Globe } from "lucide-react";
import { SSRService, type SSRSnapshot, type MetaAnalysis } from "@/utils/ssrService";

// Using SSRSnapshot from service instead of local interface

const SSRPreview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get('url') || window.location.origin);
  const [ssrData, setSSRData] = useState<SSRSnapshot | null>(null);
  const [metaAnalysis, setMetaAnalysis] = useState<MetaAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSSRSnapshot = async (targetUrl: string, forceSnapshot = false) => {
    setIsLoading(true);
    try {
      const snapshot = await SSRService.fetchSnapshot(targetUrl, {
        forceBot: forceSnapshot,
        timeout: 15000
      });

      const analysis = SSRService.analyzeMetaData(snapshot.html);
      
      setSSRData(snapshot);
      setMetaAnalysis(analysis);

      toast({
        title: "Snapshot Generated",
        description: `Successfully fetched ${forceSnapshot ? 'bot' : 'user'} version (${Math.round(snapshot.loadTime)}ms)`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching SSR snapshot:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch SSR snapshot",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Using SSRService.analyzeMetaData instead of extractMetaTags

  useEffect(() => {
    const urlParam = searchParams.get('url');
    if (urlParam && urlParam !== url) {
      setUrl(urlParam);
      fetchSSRSnapshot(urlParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ url });
    fetchSSRSnapshot(url);
  };

  // metaAnalysis is already set from SSRService

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4">
            SSR Snapshot Preview
          </h1>
          <p className="text-muted-foreground mb-6">
            View and analyze the server-side rendered HTML that search engines and social media crawlers see
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to preview..."
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isLoading ? 'Loading...' : 'Preview'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => fetchSSRSnapshot(url, true)}
              disabled={isLoading}
            >
              <Globe className="w-4 h-4 mr-2" />
              Bot View
            </Button>
          </form>

          {ssrData && (
            <div className="flex gap-2 mb-6">
              <Badge variant={ssrData.isPrerendered ? "default" : "outline"}>
                {ssrData.isPrerendered ? "Prerendered" : "Standard"}
              </Badge>
              <Badge variant={ssrData.isBot ? "secondary" : "outline"}>
                {ssrData.isBot ? "Bot Detected" : "User Agent"}
              </Badge>
              <Badge variant="outline">
                {new Date(ssrData.timestamp).toLocaleString()}
              </Badge>
              <Badge variant="outline">
                {Math.round(ssrData.loadTime)}ms
              </Badge>
            </div>
          )}
        </div>

        {ssrData && (
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="preview">Visual Preview</TabsTrigger>
              <TabsTrigger value="html">Raw HTML</TabsTrigger>
              <TabsTrigger value="meta">Meta Data</TabsTrigger>
              <TabsTrigger value="headers">Response Headers</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Rendered Snapshot
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(ssrData.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Live
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <iframe
                      srcDoc={ssrData.html}
                      className="w-full h-[70vh] border-0"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                      title="SSR Preview"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>SEO Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {metaAnalysis && (
                      <>
                        <div>
                          <h4 className="font-semibold mb-2">Page Title</h4>
                          <p className="text-sm bg-muted p-3 rounded-lg">{metaAnalysis.title || 'No title found'}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Meta Description</h4>
                          <p className="text-sm bg-muted p-3 rounded-lg">{metaAnalysis.description || 'No description found'}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Open Graph Tags ({Object.keys(metaAnalysis.ogTags).length})</h4>
                          <div className="max-h-32 overflow-y-auto text-xs bg-muted p-3 rounded-lg">
                            {Object.entries(metaAnalysis.ogTags).map(([key, value], i) => (
                              <div key={i} className="mb-1">{key}: {value}</div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Structured Data ({metaAnalysis.structuredData.length})</h4>
                          {metaAnalysis.structuredData.length > 0 ? (
                            <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-32">
                              {JSON.stringify(metaAnalysis.structuredData[0], null, 2)}
                            </pre>
                          ) : (
                            <p className="text-sm text-muted-foreground">No structured data found</p>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="html" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Raw HTML Source
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(ssrData.html, 'HTML')}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy HTML
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-[70vh] whitespace-pre-wrap break-all">
                    {ssrData.html}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meta" className="space-y-4">
              {metaAnalysis && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Meta Tags</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Title Tag</h4>
                        <code className="text-sm bg-muted p-2 rounded block">
                          {metaAnalysis.title || 'No title found'}
                        </code>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold mb-2">Meta Tags</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {metaAnalysis.metaTags.map((meta, i) => (
                            <code key={i} className="text-xs bg-muted p-2 rounded block">
                              {meta}
                            </code>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Structured Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {metaAnalysis.structuredData.length > 0 ? (
                        <div className="space-y-4">
                          {metaAnalysis.structuredData.map((data, i) => (
                            <div key={i}>
                              <h4 className="font-semibold mb-2">Schema #{i + 1}</h4>
                              <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-48">
                                {JSON.stringify(data, null, 2)}
                              </pre>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No structured data found</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="headers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Response Headers
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(ssrData.headers, null, 2), 'Headers')}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Headers
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(ssrData.headers).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-4 py-2 border-b border-border/50">
                        <code className="text-sm font-semibold min-w-0 flex-shrink-0 text-primary">
                          {key}:
                        </code>
                        <code className="text-sm bg-muted px-2 py-1 rounded flex-1 break-all">
                          {value}
                        </code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {!ssrData && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <Code2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Snapshot Loaded</h3>
              <p className="text-muted-foreground">
                Enter a URL above to generate and view the SSR snapshot
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SSRPreview;