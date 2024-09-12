import React, { useState } from 'react';
import { MdFullscreen, MdOutlineFileDownload, MdOutlineEdit, MdShare, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import SaveButton from './HoverBarButton/HoverBarButton';
import styles from './HoverBar.module.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import HoverBarButton from './HoverBarButton/HoverBarButton';

interface HoverBarProps {
  templateName: string;
  imageRef: React.RefObject<HTMLImageElement>;
}

const HoverBar: React.FC<HoverBarProps> = ({ templateName, imageRef }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleFullscreen = () => {
    const image = imageRef.current;
    if (image) {
      if (image.requestFullscreen) {
        image.requestFullscreen();
      } else if ((image as any).webkitRequestFullscreen) {
        (image as any).webkitRequestFullscreen();
      } else if ((image as any).msRequestFullscreen) {
        (image as any).msRequestFullscreen();
      }
    }
  };

  const handleDownload = () => {
    const image = imageRef.current;
    if (image) {
      const link = document.createElement('a');
      link.href = image.src;
      link.setAttribute('download', `${templateName}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleEdit = () => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}/edit`);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `Check out this template: ${templateName}`,
        url: shareUrl,
      }).catch(error => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const toggleSave = () => {
    setIsSaved(prev => !prev);
    toast.success(isSaved ? 'Removed from saved' : 'Saved');
  };

  return (
    <div className={styles.hoverBar}>
      <HoverBarButton 
        icon={<MdFullscreen />} 
        onClick={handleFullscreen} 
        tooltip="Fullscreen" 
      />
      <HoverBarButton 
        icon={<MdOutlineFileDownload />} 
        onClick={handleDownload} 
        tooltip="Download" 
      />
      <HoverBarButton 
        icon={<MdOutlineEdit />} 
        onClick={handleEdit} 
        tooltip="Edit" 
      />
      <HoverBarButton 
        icon={<MdShare />} 
        onClick={handleShare} 
        tooltip="Share" 
      />
      <HoverBarButton
        icon={isSaved ? <MdFavorite /> : <MdFavoriteBorder />}
        onClick={toggleSave}
        tooltip={isSaved ? "Unsave" : "Save"}
      />
    </div>
  );
};

export default HoverBar;
