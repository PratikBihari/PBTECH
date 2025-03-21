# Deployment Instructions for GitHub Pages

Since we can't directly authenticate with GitHub from this session, follow these steps to deploy your website to GitHub Pages:

## 1. Push Your Local Code to GitHub

Run these commands in your terminal, replacing `YOUR_USERNAME` with your GitHub username and `YOUR_TOKEN` with your personal access token:

```bash
cd "/Users/pratik/Downloads/Python Code/pb-tech"
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/PratikBihari/PBTECH.git
git push -u origin main
```

## 2. Configure GitHub Pages

1. Go to your repository on GitHub (https://github.com/PratikBihari/PBTECH)
2. Click on "Settings"
3. In the left sidebar, click on "Pages"
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select "main" and "/root", then click "Save"
6. Wait a few minutes for your site to deploy

Your website will be available at https://pratikbihari.github.io/PBTECH/ 