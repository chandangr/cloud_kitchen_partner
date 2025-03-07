import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface WebsiteBuilderProps {
  subtitle: string;
  title: string;
  description: string;
  introTitle: string;
  introDescription: string;
  featuredTitle: string;
  featuredDescription: string;
  location: string;
  instagram: string;
  facebook: string;
  companyLogo: string;
  headerBackground: string;
  introMedia: string;
  introImage: string;
  featuredImage: string;
}

const WebsiteBuilder = (props: WebsiteBuilderProps) => {
  const {
    subtitle: defaultSubtitle,
    title: defaultTitle,
    description: defaultDescription,
    introTitle: defaultIntroTitle,
    introDescription: defaultIntroDescription,
    featuredTitle: defaultFeaturedTitle,
    featuredDescription: defaultFeaturedDescription,
    location: defaultLocation,
    instagram: defaultInstagram,
    facebook: defaultFacebook,
    companyLogo: defaultCompanyLogo,
    headerBackground: defaultHeaderBackground,
    introMedia: defaultIntroMedia,
    introImage: defaultIntroImage,
    featuredImage: defaultFeaturedImage
  } = props;

  const [subtitle, setSubtitle] = useState(defaultSubtitle);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [introTitle, setIntroTitle] = useState(defaultIntroTitle);
  const [introDescription, setIntroDescription] = useState(defaultIntroDescription);
  const [introMedia, setIntroMedia] = useState(defaultIntroMedia);
  const [introImage, setIntroImage] = useState(defaultIntroImage);
  const [featuredTitle, setFeaturedTitle] = useState(defaultFeaturedTitle);
  const [featuredDescription, setFeaturedDescription] = useState(defaultFeaturedDescription);
  const [featuredImage, setFeaturedImage] = useState(defaultFeaturedImage);
  const [companyLogo, setCompanyLogo] = useState(defaultCompanyLogo);
  const [headerBackground, setHeaderBackground] = useState(defaultHeaderBackground);
  const [location, setLocation] = useState(defaultLocation);
  const [instagram, setInstagram] = useState(defaultInstagram);
  const [facebook, setFacebook] = useState(defaultFacebook);
  const [isPreview, setIsPreview] = useState(false);
  const [titleColor, setTitleColor] = useState('#000000');
  const [subtitleColor, setSubtitleColor] = useState('#000000');
  const [descriptionColor, setDescriptionColor] = useState('#000000');

  useEffect(() => {
    setSubtitle(defaultSubtitle);
    setTitle(defaultTitle);
    setDescription(defaultDescription);
    setIntroTitle(defaultIntroTitle);
    setIntroDescription(defaultIntroDescription);
    setFeaturedTitle(defaultFeaturedTitle);
    setFeaturedDescription(defaultFeaturedDescription);
    setLocation(defaultLocation);
    setInstagram(defaultInstagram);
    setFacebook(defaultFacebook);
    setCompanyLogo(defaultCompanyLogo);
    setHeaderBackground(defaultHeaderBackground);
    setIntroMedia(defaultIntroMedia);
    setIntroImage(defaultIntroImage);
    setFeaturedImage(defaultFeaturedImage);
  }, [
    defaultSubtitle,
    defaultTitle,
    defaultDescription,
    defaultIntroTitle,
    defaultIntroDescription,
    defaultFeaturedTitle,
    defaultFeaturedDescription,
    defaultLocation,
    defaultInstagram,
    defaultFacebook,
    defaultCompanyLogo,
    defaultHeaderBackground,
    defaultIntroMedia,
    defaultIntroImage,
    defaultFeaturedImage
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={togglePreview}>{isPreview ? 'Exit Preview' : 'Preview'}</Button>
        <Button className="ml-2">Save & publish</Button>
      </div>
      <div className="flex">
        {!isPreview && (
          <div className="w-1/3 p-4 h-400px">
            <Accordion type="single" collapsible>
              <AccordionItem value="header">
                <AccordionTrigger>Header</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold">Visuals</h3>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Company logo</label>
                          <Input type="file" onChange={(e) => handleFileChange(e, setCompanyLogo)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Header background</label>
                          <Input type="file" onChange={(e) => handleFileChange(e, setHeaderBackground)} />
                        </div>
                        <h3 className="text-lg font-semibold mt-4">Text</h3>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Subtitle (optional)</label>
                          <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Title *</label>
                          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Description (optional)</label>
                          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="intro">
                <AccordionTrigger>Introduction</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent>
                      <div className="mt-4">
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Title</label>
                          <Input value={introTitle} onChange={(e) => setIntroTitle(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Description</label>
                          <Input value={introDescription} onChange={(e) => setIntroDescription(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Image/Video</label>
                          <Input type="file" onChange={(e) => handleFileChange(e, setIntroMedia)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="introImage">
                <AccordionTrigger>Introduction Image</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent>
                      <div className="mt-4">
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Image</label>
                          <Input type="file" onChange={(e) => handleFileChange(e, setIntroImage)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="featuredMenu">
                <AccordionTrigger>Featured Menu</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent>
                      <div className="mt-4">
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Title</label>
                          <Input value={featuredTitle} onChange={(e) => setFeaturedTitle(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Description</label>
                          <Input value={featuredDescription} onChange={(e) => setFeaturedDescription(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Image</label>
                          <Input type="file" onChange={(e) => handleFileChange(e, setFeaturedImage)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="footer">
                <AccordionTrigger>Footer</AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardContent>
                      <div className="mt-4">
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Location</label>
                          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Instagram</label>
                          <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Facebook</label>
                          <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="appearance">
                <AccordionTrigger>Appearance</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Appearance settings</h3>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">Title Color</label>
                      <input type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">Subtitle Color</label>
                      <input type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)} />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">Description Color</label>
                      <input type="color" value={descriptionColor} onChange={(e) => setDescriptionColor(e.target.value)} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
              <div className={`h-full ${isPreview ? 'w-full p-4 bg-gray-100' : 'w-2/3 p-4 bg-gray-100'}`}>
          <div className={`p-4 bg-white rounded shadow ${isPreview ? 'h-screen' : 'h-[70vh]'}`} style={{ backgroundImage: `url(${headerBackground})`, backgroundSize: 'cover' }}>
            {companyLogo && <img src={companyLogo} alt="Company Logo" className="h-12 mb-4" />}
            <h2 className="text-2xl font-bold" style={{ color: titleColor }}>{title}</h2>
            <p className="text-lg mt-2" style={{ color: subtitleColor }}>{subtitle}</p>
            <p className="mt-4" style={{ color: descriptionColor }}>{description}</p>
          </div>
          <div className="p-4 bg-white rounded shadow mt-4 flex">
            <div className="w-1/2">
              <h2 className="text-2xl font-bold" style={{ color: titleColor }}>{introTitle}</h2>
              <p className="mt-4" style={{ color: descriptionColor }}>{introDescription}</p>
              <Button className="mt-4">Read More</Button>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              {introMedia && <img src={introMedia} alt="Introduction Media" className="mt-4" />}
            </div>
          </div>
          {introImage && (
            <a href="#" className="block mt-4">
                <div className={`w-full h-96 bg-cover bg-center ${isPreview ? 'h-screen' : 'h-[70vh]'}`} style={{ backgroundImage: `url(${introImage})` }}></div>
            </a>
          )}
          {featuredImage && (
            <div className={`p-4 bg-white rounded shadow mt-4 flex ${isPreview ? 'h-[60vh]' : 'h-[30vh]'}`}>
              <div className="w-1/2">
                <h2 className="text-2xl font-bold" style={{ color: titleColor }}>{featuredTitle}</h2>
                <p className="mt-4" style={{ color: descriptionColor }}>{featuredDescription}</p>
                <Button className="mt-4" onClick={() => window.location.href = '#'}>Full Menu</Button>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <img src={featuredImage} alt="Featured Menu" className="mt-4" />
              </div>
            </div>
          )}
          <div className="p-4 bg-black text-white rounded shadow mt-4 flex justify-between">
            <div>
              <h3 className="text-lg font-semibold" >QUICK LINKS</h3>
              <ul className="mt-2">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>Shipping Policy</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold" >LOCATION</h3>
              <p className="mt-2">{location}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold" >WE ARE SOCIAL</h3>
              <div className="mt-2 flex space-x-4">
                <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
              <Button className="mt-4">Leave Us Your Feedback</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
