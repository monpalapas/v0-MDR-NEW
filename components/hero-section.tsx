"use client";

import { useState, useEffect } from 'react';

type Alert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
};

type WeatherData = {
  temp: number;
  description: string;
  icon: string;
  date: string;
};

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  // Removed weather ticker state

  const closeModals = () => {
    const hotlineModal = document.getElementById('hotline-modal');
    const incidentModal = document.getElementById('incident-modal');
    const successModal = document.getElementById('success-modal');
    if (hotlineModal) hotlineModal.classList.add('hidden');
    if (incidentModal) incidentModal.classList.add('hidden');
    if (successModal) successModal.classList.add('hidden');
  };

  const handleIncidentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Incident report submitted!');
    closeModals();
  };

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!currentTime) return;
    const hour = currentTime.getHours();
    let image = '';
    if (hour >= 5 && hour < 7) {
      image = '/images/sunrise.webp';
    } else if (hour >= 7 && hour < 17) {
      fetch('/images/noontime.webp', { method: 'HEAD' })
        .then((res) => {
          setBackgroundImage(res.ok ? '/images/noontime.webp' : '/images/sunrise.webp');
        })
        .catch(() => setBackgroundImage('/images/sunrise.webp'));
      return;
    } else if (hour >= 17 && hour < 18) {
      image = '/images/sunset.webp';
    } else {
      image = '/images/night.webp';
    }
    setBackgroundImage(image);
  }, [currentTime]);

  // Removed weather ticker effect

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const previewImage = (input: HTMLInputElement) => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        document.getElementById('upload-error')?.classList.remove('hidden');
        document.getElementById('error-message')!.textContent = 'File size exceeds 5MB limit';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById('preview') as HTMLImageElement;
        if (preview) preview.src = e.target?.result as string;
        document.getElementById('file-name')!.textContent = file.name;
        document.getElementById('file-size')!.textContent = (file.size / 1024).toFixed(1) + ' KB';
        document.getElementById('image-preview')?.classList.remove('hidden');
        document.getElementById('upload-error')?.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    (document.getElementById('file-upload') as HTMLInputElement).value = '';
    document.getElementById('image-preview')?.classList.add('hidden');
  };

  const getLocation = () => {
    const btn = document.getElementById('location-btn');
    if (!btn) return;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Getting location...';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          btn.innerHTML = '<i class="fas fa-check mr-1"></i> Location acquired';
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-location-arrow mr-1"></i> Use My Current Location';
          }, 2000);
        },
        () => {
          btn.innerHTML = '<i class="fas fa-exclamation mr-1"></i> Location failed';
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-location-arrow mr-1"></i> Use My Current Location';
          }, 2000);
        }
      );
    } else {
      btn.innerHTML = '<i class="fas fa-exclamation mr-1"></i> Not supported';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-location-arrow mr-1"></i> Use My Current Location';
      }, 2000);
    }
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-b from-yellow-900 to-blue-100 overflow-hidden min-h-screen" id="hero">
      <div className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-1000" style={{ backgroundImage: `url('${backgroundImage}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-800/30"></div>

      {currentTime && (
        <div className="absolute top-2 right-6 z-10">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-3 shadow-xl glass-effect">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
              <div className="text-sm opacity-80">{formatDate(currentTime)}</div>
              <div className="text-xs opacity-70 mt-1">Asia/Manila</div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-white mb-5">
          <span className="text-yellow-500">Resilient Pio Duran:</span>
          <br /> Prepared for Tomorrow
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto mb-8 [text-shadow:_1px_1px_2px_rgb(0,0,0,0.4)]">
          Enhancing disaster preparedness, strengthening community resilience and ensuring safety for all.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => document.getElementById('hotline-modal')?.classList.remove('hidden')} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-full shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
            <i className="fas fa-phone-alt mr-2"></i> Emergency Hotline
          </button>
          <a href="/contact/report-incident" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
            <i className="fas fa-exclamation-triangle mr-2"></i> Report an Incident
          </a>
        </div>
      </div>

      {/* Weather ticker removed */}

      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-10">
        <a href="#weather" className="text-white animate-bounce">
          <i className="fas fa-chevron-down text-3xl"></i>
        </a>
      </div>

      <section id="incident-modal" className="hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-14 mt-14 p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-900">Report an Emergency or Disaster-Related Incident</h3>
            <button onClick={closeModals} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start">
            <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-bold text-red-700 mb-1">Emergency Notice</h4>
              <p className="text-sm text-gray-700">Use this secure form to report emergencies, hazards, or disaster-related incidents within the Municipality of Pio Duran. All submissions are reviewed by MDRRMO responders.</p>
            </div>
          </div>
          <form id="incident-form" className="space-y-6" onSubmit={handleIncidentSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reporter-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name (Required)</label>
                <input type="text" id="reporter-name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700 mb-1">Contact Number (Required)</label>
                <input type="tel" id="contact-number" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label htmlFor="incident-location" className="block text-sm font-medium text-gray-700 mb-1">Location of Incident</label>
              <select id="incident-location" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2">
                <option value="">Select Barangay</option>
                <option value="Barangay 1">Barangay 1</option>
                <option value="Agol">Agol</option>
                <option value="Alabangpuro">Alabangpuro</option>
                <option value="Basicao Coastal">Basicao Coastal</option>
                <option value="Basicao Interior">Basicao Interior</option>
                <option value="Banawan">Banawan</option>
                <option value="Binodegahan">Binodegahan</option>
                <option value="Buenavista">Buenavista</option>
                <option value="Buyo">Buyo</option>
                <option value="Caratagan">Caratagan</option>
                <option value="Cuyaoyao">Cuyaoyao</option>
                <option value="Flores">Flores</option>
                <option value="Lawinon">Lawinon</option>
                <option value="Macasitas">Macasitas</option>
                <option value="Malapay">Malapay</option>
                <option value="Malidong">Malidong</option>
                <option value="Mamlad">Mamlad</option>
                <option value="Marigondon">Marigondon</option>
                <option value="Nablangbulod">Nablangbulod</option>
                <option value="Oringon">Oringon</option>
                <option value="Palapas">Palapas</option>
                <option value="Panganiran">Panganiran</option>
                <option value="Rawis">Rawis</option>
                <option value="Salvacion">Salvacion</option>
                <option value="Sto. Cristo">Sto. Cristo</option>
                <option value="Sukip">Sukip</option>
                <option value="Tibabo">Tibabo</option>
              </select>
              <input type="text" id="landmark" placeholder="Nearest landmark or specific location" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <button type="button" onClick={getLocation} id="location-btn" className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <i className="fas fa-location-arrow mr-1"></i> Use My Current Location
              </button>
            </div>
            <div>
              <label htmlFor="incident-type" className="block text-sm font-medium text-gray-700 mb-1">Type of Incident</label>
              <select id="incident-type" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="Fire">Fire</option>
                <option value="Flood">Flood</option>
                <option value="Landslide">Landslide</option>
                <option value="Vehicular Accident">Vehicular Accident</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="incident-description" className="block text-sm font-medium text-gray-700 mb-1">Incident Description</label>
              <textarea id="incident-description" rows={4} placeholder="Provide a detailed description..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="urgency" value="LOW" className="h-5 w-5 text-green-500 focus:ring-green-500" />
                  <span className="ml-2">LOW</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="urgency" value="MEDIUM" className="h-5 w-5 text-yellow-500 focus:ring-yellow-500" />
                  <span className="ml-2">MEDIUM</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="urgency" value="HIGH" defaultChecked className="h-5 w-5 text-red-500 focus:ring-red-500" />
                  <span className="ml-2">HIGH (require immediate attention)</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input id="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => previewImage(e.target)} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              <div id="image-preview" className="mt-2 hidden">
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <div className="flex items-center">
                    <img id="preview" className="h-16 w-16 object-cover rounded-md" alt="Preview" />
                    <div className="ml-3">
                      <p id="file-name" className="text-sm font-medium text-gray-900"></p>
                      <p id="file-size" className="text-xs text-gray-500"></p>
                    </div>
                  </div>
                  <button type="button" onClick={removeImage} className="text-red-600 hover:text-red-800">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div id="upload-error" className="mt-2 hidden">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                  <i className="fas fa-exclamation-circle text-red-500 mr-3 mt-1"></i>
                  <div>
                    <p id="error-message" className="text-sm text-red-700"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <input id="agreement" type="checkbox" required className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label htmlFor="agreement" className="ml-3 text-sm font-medium text-gray-700">I confirm that the information provided is accurate to the best of my knowledge.</label>
            </div>
            <div className="pb-14">
              <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-md hover:from-red-700 hover:to-red-800 transition duration-300">Submit Report</button>
            </div>
          </form>
        </div>
      </section>

      <div id="success-modal" className="hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <i className="fas fa-check text-green-600"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mt-3">Report Submitted Successfully!</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Your reference number is: <span className="font-bold">RD-2025-0001</span></p>
            <p className="text-sm text-gray-500 mt-2">An MDRRMO responder will contact you shortly.</p>
          </div>
          <div className="mt-4">
            <button onClick={closeModals} className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200">Close</button>
          </div>
        </div>
      </div>

      <div id="hotline-modal" className="hidden fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 pt-14">
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full">
          <button onClick={closeModals} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl">
            <i className="fas fa-times-circle"></i>
          </button>
          <div className="flex items-center gap-4 mb-6">
            <i className="fas fa-phone-volume text-5xl text-red-600"></i>
            <h3 className="text-2xl font-bold text-blue-950">Emergency Hotlines</h3>
          </div>
          <div className="space-y-3 text-gray-800 text-sm">
            <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-user-tie text-blue-600 text-xl mt-1"></i>
              <p><strong>Office of the Mayor:</strong> <a href="tel:0521234567" className="text-yellow-600 hover:underline">(052) 123-4567</a></p>
            </div>
            <div className="flex items-start gap-3 bg-red-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-fire-extinguisher text-red-600 text-xl mt-1"></i>
              <p><strong>MDRRMO:</strong> <a href="tel:911" className="text-yellow-600 hover:underline">911</a> / <a href="tel:0522345678" className="text-yellow-600 hover:underline">(052) 234-5678</a></p>
            </div>
            <div className="flex items-start gap-3 bg-purple-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-users text-purple-600 text-xl mt-1"></i>
              <p><strong>MSWD:</strong> <a href="tel:1343" className="text-yellow-600 hover:underline">1343</a></p>
            </div>
            <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-user-md text-green-600 text-xl mt-1"></i>
              <p><strong>Medical/MHO:</strong> <a href="tel:0523456789" className="text-yellow-600 hover:underline">(052) 345-6789</a></p>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-shield-alt text-blue-700 text-xl mt-1"></i>
              <p><strong>PNP:</strong> <a href="tel:117" className="text-yellow-600 hover:underline">117</a> / <a href="tel:0524567890" className="text-yellow-600 hover:underline">(052) 456-7890</a></p>
            </div>
            <div className="flex items-start gap-3 bg-orange-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-fire text-orange-600 text-xl mt-1"></i>
              <p><strong>BFP:</strong> <a href="tel:0525678901" className="text-yellow-600 hover:underline">(052) 567-8901</a></p>
            </div>
            <div className="flex items-start gap-3 bg-cyan-50 rounded-lg p-3 hover:shadow-md transition">
              <i className="fas fa-anchor text-cyan-600 text-xl mt-1"></i>
              <p><strong>PCG:</strong> <a href="tel:0526789012" className="text-yellow-600 hover:underline">(052) 678-9012</a></p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
