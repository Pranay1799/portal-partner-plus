import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  FileText, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye,
  Search,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  status: "draft" | "published" | "archived";
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "GST Filing Deadlines for Q1 2024",
    category: "GST",
    content: "Important dates and deadlines for GST filing in Q1 2024. Make sure to file your returns on time to avoid penalties...",
    status: "published",
    author: "Admin",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-05",
    views: 245
  },
  {
    id: "2",
    title: "New Income Tax Regulations 2024",
    category: "Income Tax",
    content: "The government has introduced new income tax regulations effective from April 2024. Here's what you need to know...",
    status: "published",
    author: "Admin",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
    views: 189
  },
  {
    id: "3",
    title: "TDS Compliance Checklist",
    category: "TDS",
    content: "A comprehensive checklist for TDS compliance. Ensure your organization is following all the necessary steps...",
    status: "draft",
    author: "Admin",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
    views: 0
  },
  {
    id: "4",
    title: "Understanding ROC Filing Requirements",
    category: "ROC",
    content: "Learn about the various ROC filing requirements for different types of companies...",
    status: "archived",
    author: "Admin",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-15",
    views: 156
  }
];

const categories = ["GST", "Income Tax", "TDS", "ROC", "Compliance", "General", "Updates"];

export function ArticleManagement() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    status: "draft" as Article["status"]
  });

  const getStatusConfig = (status: Article["status"]) => {
    switch (status) {
      case "published":
        return { color: "bg-green-500/10 text-green-500 border-green-500/20", label: "Published" };
      case "draft":
        return { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Draft" };
      case "archived":
        return { color: "bg-muted text-muted-foreground border-muted", label: "Archived" };
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData({ title: "", category: "", content: "", status: "draft" });
  };

  const handleAddArticle = () => {
    if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newArticle: Article = {
      id: `article-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      content: formData.content,
      status: formData.status,
      author: "Admin",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0
    };

    setArticles(prev => [newArticle, ...prev]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Article created successfully");
  };

  const handleEditArticle = () => {
    if (!selectedArticle || !formData.title.trim() || !formData.category || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setArticles(prev => prev.map(article =>
      article.id === selectedArticle.id
        ? {
            ...article,
            title: formData.title,
            category: formData.category,
            content: formData.content,
            status: formData.status,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : article
    ));

    setIsEditDialogOpen(false);
    setSelectedArticle(null);
    resetForm();
    toast.success("Article updated successfully");
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(article => article.id !== articleId));
    toast.success("Article deleted successfully");
  };

  const openEditDialog = (article: Article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      status: article.status
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (article: Article) => {
    setSelectedArticle(article);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Article Management</h2>
          <p className="text-muted-foreground">Create and manage articles for client communication hub</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter article title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Article["status"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your article content..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleAddArticle}>Create Article</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Articles ({filteredArticles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => {
                const statusConfig = getStatusConfig(article.status);
                return (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-[300px] truncate">{article.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{article.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig.color}>
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{article.views}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.updatedAt}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(article)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Article</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{article.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteArticle(article.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                placeholder="Enter article title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Article["status"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content *</Label>
              <Textarea
                id="edit-content"
                placeholder="Write your article content..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleEditArticle}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{selectedArticle.category}</Badge>
                <Badge variant="outline" className={getStatusConfig(selectedArticle.status).color}>
                  {getStatusConfig(selectedArticle.status).label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedArticle.views} views
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {selectedArticle.createdAt} | Updated: {selectedArticle.updatedAt} | By: {selectedArticle.author}
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{selectedArticle.content}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
