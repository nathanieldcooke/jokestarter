import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../compStyles/Footer.css'

function Footer() {
  return (
    <footer className='links'>
      <span>Nathaniel Cooke: </span>
      <a href="https://github.com/nathanieldcooke" target="_blank" >
        <label>Github - </label>
        <GitHubIcon/>
      </a>
      <a href="https://nathanieldcooke.github.io/" target="_blank" >
        <label>Portfolio - </label>
        <FolderSharedIcon/>
      </a>
      <a href="https://www.linkedin.com/in/nathaniel-cooke-nrd/" target="_blank" >
        <label>LinkedIn - </label>
        <LinkedInIcon/>
      </a>
    </footer>
  )
}
export default Footer;