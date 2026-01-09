import { useState, useEffect } from 'react';
import { Upload, Trash2, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Video {
  name: string;
  url: string;
  size: number;
  created_at: string;
}

interface FeaturedVideo {
  id: string;
  position: number;
  video_name: string;
  video_url: string;
  label: string;
}

export default function AdminVideoUpload() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [featuredVideos, setFeaturedVideos] = useState<FeaturedVideo[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<{ [key: number]: string }>({});
  const [labels, setLabels] = useState<{ [key: number]: string }>({
    1: 'Raw → Final',
    2: 'Before / After',
    3: 'Raw → Final',
  });

  useEffect(() => {
    loadVideos();
    loadFeaturedVideos();
  }, []);

  const getErrorMessage = (error: any, action: string): string => {
    console.error(`Error ${action}:`, error);

    const errorMessage = error?.message || String(error);

    if (errorMessage.includes('row-level security') || errorMessage.includes('policy')) {
      return `Permission denied. The storage bucket permissions need to be updated. Please check your Supabase dashboard > Storage > videos bucket > Policies.`;
    }

    if (errorMessage.includes('Bucket not found') || errorMessage.includes('bucket')) {
      return `Storage bucket 'videos' not found. Please create it in your Supabase dashboard > Storage > Create a new bucket named 'videos'.`;
    }

    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return `Network error. Check your internet connection and make sure your Supabase URL is correct.`;
    }

    if (errorMessage.includes('JWT') || errorMessage.includes('apikey')) {
      return `Authentication error. Check that your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in your .env file.`;
    }

    if (errorMessage.includes('size') || errorMessage.includes('too large')) {
      return `File too large. Try uploading a smaller video file (max 50MB recommended).`;
    }

    if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
      return `A file with this name already exists. The file will be renamed automatically on retry.`;
    }

    return `${action} failed: ${errorMessage}. Please try again or check the browser console for details.`;
  };

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase.storage.from('videos').list();

      if (error) throw error;

      const videosWithUrls = data
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map((file) => {
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
      setMessage({ type: 'error', text: getErrorMessage(error, 'Loading videos') });
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
      let uploadedCount = 0;

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error } = await supabase.storage.from('videos').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

        if (error) {
          throw new Error(`Failed to upload ${file.name}: ${error.message}`);
        }

        uploadedCount++;
      }

      setMessage({
        type: 'success',
        text: `Successfully uploaded ${uploadedCount} video(s)! They will appear on your landing page.`
      });
      await loadVideos();
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error, 'Uploading video') });
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

      setMessage({ type: 'success', text: 'Video deleted successfully. It will no longer appear on your landing page.' });
      await loadVideos();
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error, 'Deleting video') });
    }
  };

  const loadFeaturedVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_videos')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;

      setFeaturedVideos(data || []);

      const selected: { [key: number]: string } = {};
      const loadedLabels: { [key: number]: string } = { ...labels };

      data?.forEach((fv) => {
        selected[fv.position] = fv.video_name;
        loadedLabels[fv.position] = fv.label;
      });

      setSelectedVideos(selected);
      setLabels(loadedLabels);
    } catch (error) {
      console.error('Error loading featured videos:', error);
    }
  };

  const handleSaveFeaturedVideos = async () => {
    try {
      for (let position = 1; position <= 3; position++) {
        const videoName = selectedVideos[position];
        const label = labels[position] || 'Raw → Final';

        if (!videoName) continue;

        const video = videos.find((v) => v.name === videoName);
        if (!video) continue;

        const existingFeatured = featuredVideos.find((fv) => fv.position === position);

        if (existingFeatured) {
          const { error } = await supabase
            .from('featured_videos')
            .update({
              video_name: videoName,
              video_url: video.url,
              label: label,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingFeatured.id);

          if (error) throw error;
        } else {
          const { error } = await supabase.from('featured_videos').insert({
            position,
            video_name: videoName,
            video_url: video.url,
            label: label,
          });

          if (error) throw error;
        }
      }

      setMessage({
        type: 'success',
        text: 'Featured videos updated successfully! They are now live on your landing page.',
      });
      await loadFeaturedVideos();
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error, 'Saving featured videos') });
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
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-semibold mb-1 ${message.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                  {message.type === 'success' ? 'Success!' : 'Error'}
                </p>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <button
                onClick={() => setMessage(null)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
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

          {videos.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Featured Gallery Videos
              </h2>
              <p className="text-gray-600 mb-6">
                Select which 3 videos to display in the main gallery on your landing page
              </p>

              <div className="space-y-6">
                {[1, 2, 3].map((position) => (
                  <div key={position} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Position {position}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Video
                        </label>
                        <select
                          value={selectedVideos[position] || ''}
                          onChange={(e) =>
                            setSelectedVideos({ ...selectedVideos, [position]: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B89B4F] focus:border-[#B89B4F] outline-none"
                        >
                          <option value="">-- Select a video --</option>
                          {videos.map((video) => (
                            <option key={video.name} value={video.name}>
                              {video.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Label
                        </label>
                        <input
                          type="text"
                          value={labels[position] || ''}
                          onChange={(e) =>
                            setLabels({ ...labels, [position]: e.target.value })
                          }
                          placeholder="e.g., Raw → Final"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B89B4F] focus:border-[#B89B4F] outline-none"
                        />
                      </div>
                    </div>

                    {selectedVideos[position] && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <div className="aspect-[9/16] max-w-[200px] bg-gray-900 rounded-lg overflow-hidden">
                          <video
                            src={videos.find((v) => v.name === selectedVideos[position])?.url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveFeaturedVideos}
                className="mt-6 bg-[#B89B4F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A88B3F] transition-colors"
              >
                Save Featured Videos
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How to use uploaded videos:</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Upload your videos using the upload area above</li>
              <li>Select 3 videos to feature in the gallery section</li>
              <li>Customize the label for each video (e.g., "Raw → Final", "Before / After")</li>
              <li>Click "Save Featured Videos" to update your landing page</li>
              <li>Delete old videos you no longer need</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
