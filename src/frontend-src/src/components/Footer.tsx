import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../compStyles/Footer.css'

function Footer() {
  return (
    <footer className='links'>
      <span>Nathaniel Cooke: </span>
      <a href="https://github.com/nathanieldcooke/jokestarter/wiki" target="_blank" >
        <GitHubIcon />
      </a>
      <a href="https://www.linkedin.com/in/nathaniel-cooke-nrd/" target="_blank" >
        <LinkedInIcon />
      </a>
      <a href="https://nathanieldcooke.github.io/" target="_blank" >
        <FolderSharedIcon />
      </a>
    </footer>
  )
};
export default Footer;