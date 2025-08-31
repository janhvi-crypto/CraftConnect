import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Square, Play, Pause, Type, ArrowLeft } from "lucide-react";

export default function VoiceRecordStep({ data, updateData, onNext, onPrev }) {
  const [recordingMethod, setRecordingMethod] = useState('text'); // 'voice' or 'text'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleTextChange = (e) => {
    updateData({ textDescription: e.target.value });
  };

  const canProceed = data.textDescription.trim().length > 10 || data.voiceNote;

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Share Your Craft's Story</CardTitle>
        <p className="text-gray-600">Tell us about your creation - its inspiration, materials, and what makes it special</p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Method Selection */}
        <div className="flex gap-4">
          <Button
            variant={recordingMethod === 'text' ? 'default' : 'outline'}
            onClick={() => setRecordingMethod('text')}
            className="flex-1 gap-2"
          >
            <Type className="w-4 h-4" />
            Type Description
          </Button>
          <Button
            variant={recordingMethod === 'voice' ? 'default' : 'outline'}
            onClick={() => setRecordingMethod('voice')}
            className="flex-1 gap-2"
          >
            <Mic className="w-4 h-4" />
            Record Voice Note
          </Button>
        </div>

        {/* Text Input Method */}
        {recordingMethod === 'text' && (
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your craft... For example: This is a handwoven cotton saree made using traditional techniques passed down through generations in my family. The intricate border patterns represent..."
              value={data.textDescription}
              onChange={handleTextChange}
              className="min-h-32 resize-none border-orange-200 focus:border-orange-400"
            />
            <div className="text-sm text-gray-500">
              {data.textDescription.length}/500 characters
            </div>
          </div>
        )}

        {/* Voice Recording Method */}
        {recordingMethod === 'voice' && (
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              {isRecording ? (
                <div className="w-16 h-16 bg-white rounded-lg animate-pulse"></div>
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
            </div>

            {isRecording && (
              <div className="text-2xl font-mono font-bold text-red-600">
                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <Button
                  onClick={() => setIsRecording(true)}
                  className="bg-red-500 hover:bg-red-600 gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={() => setIsRecording(false)}
                  variant="outline"
                  className="gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop Recording
                </Button>
              )}
            </div>

            {data.voiceNote && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium mb-2">✓ Voice note recorded</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Play className="w-4 h-4" />
                  Play Recording
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Sample Questions for Inspiration */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 mb-2">Need inspiration? Try answering these:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• What materials did you use and why?</li>
            <li>• How long did it take to make?</li>
            <li>• What's the story behind this design?</li>
            <li>• What makes your craft technique unique?</li>
            <li>• Who taught you this skill?</li>
          </ul>
        </div>

        <div className="flex justify-between items-center pt-6">
          <Button variant="outline" onClick={onPrev} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Photos
          </Button>
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
          >
            Next: Basic Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
