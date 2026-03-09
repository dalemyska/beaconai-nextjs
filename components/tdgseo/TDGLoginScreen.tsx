'use client';

import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const TOOL_PASSWORD = process.env.NEXT_PUBLIC_TDG_TOOL_PASSWORD || '';

interface TDGLoginScreenProps {
  onLogin: () => void;
}

export function TDGLoginScreen({ onLogin }: TDGLoginScreenProps) {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TOOL_PASSWORD) {
      setAuthError('');
      sessionStorage.setItem('tdg-seo-auth', 'true');
      onLogin();
    } else {
      setAuthError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white text-2xl" style={{ backgroundColor: '#1C7C7C' }}>
              TDG
            </div>
          </div>
          <CardTitle style={{ color: '#1C7C7C' }}>SEO Content Generator</CardTitle>
          <p className="text-sm" style={{ color: '#6B7280' }}>Internal tool for Transportation Development Group</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium" style={{ color: '#2C3E50' }}>
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10"
                  autoFocus
                />
              </div>
              {authError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {authError}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full font-bold"
              style={{ backgroundColor: '#1C7C7C', color: '#FFFFFF' }}
            >
              Access Tool
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
