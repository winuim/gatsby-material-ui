import React from "react";

import SEO from "../components/Seo";
import Album from "../templates/album/Album";

const AlbumPage: React.FC = () => {
  return (
    <div>
      <SEO title="album page" />
      <Album />
    </div>
  );
};

export default AlbumPage;
