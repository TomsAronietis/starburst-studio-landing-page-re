import { useState, useEffect } from 'react';
import { Upload, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Video {
  name: string;
  url: string;
  size: number;
  created_at: string;
}

export default function AdminVideoUpload() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase.storage.from('videos').list();

      if (error) throw error;

      const videosWithUrls = data.map((file) => {
        const { data: urlData } = supabase.storage.from('videos').getPublicUrl(file.name);
        return {
          name: file.name,
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          created_at: file.created_at,
        };
      });

      setVideos(videosWithUrls);
    } catch (error) {
      console.error('Error loading videos:', error);
      setMessage({ type: 'error', text: 'Failed to load videos' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage(null);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error } = await supabase.storage.from('videos').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

        if (error) throw error;
      }

      setMessage({ type: 'success', text: `Successfully uploaded ${files.length} video(s)` });
      await loadVideos();
    } catch (error) {
      console.error('Error uploading:', error);
      setMessage({ type: 'error', text: 'Failed to upload video(s)' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase.storage.from('videos').remove([fileName]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Video deleted successfully' });
      await loadVideos();
    } catch (error) {
      console.error('Error deleting:', error);
      setMessage({ type: 'error', text: 'Failed to delete video' });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Management</h1>
          <p className="text-gray-600 mb-8">Upload and manage videos for your landing page</p>

          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="mb-8">
            <label className="block mb-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#B89B4F] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                />
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-12 h-12 text-[#B89B4F] animate-spin" />
                    <p className="text-gray-600 font-medium">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-700 font-medium">Click to upload videos</p>
                    <p className="text-sm text-gray-500">MP4, MOV, or any video format</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Uploaded Videos ({videos.length})
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#B89B4F] animate-spin" />
              </div>
            ) : videos.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No videos uploaded yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.name} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-[9/16] bg-gray-900">
                      <video
                        src={video.url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 truncate mb-2" title={video.name}>
                        {video.name}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {formatFileSize(video.size)}
                      </p>
                      <button
                        onClick={() => handleDelete(video.name)}
                        className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How to use uploaded videos:</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Upload your videos using the upload area above</li>
              <li>Videos will automatically appear on your landing page</li>
              <li>The most recently uploaded videos will be displayed</li>
              <li>Delete old videos you no longer need</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
