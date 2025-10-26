import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (could integrate with email service)
    console.log('Form submitted:', formData);
    alert('Thank you for contacting Advik Furniture! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 94719 83191'],
      link: 'tel:+919471983191',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@advik.com'],
      link: 'mailto:info@advik.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['663A, Thandal Kazhani, G.N.T Road', 'Puzhal Redhhills, Chennai - 66'],
      link: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Sat: 11:00 AM - 6:00 PM', 'Sunday: Closed'],
      link: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our furniture? Want to place a custom order? 
            We're here to help bring your vision to life.
          </p>
        </motion.div>

        <div>
          {/* Contact Information */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-base">{info.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
