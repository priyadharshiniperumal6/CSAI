import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { ANT_THEME_TOKEN } from '../../theme/themeAntDesign';
import { UniAudioPlayer } from './UniAudioPlayer';
import { UniAudioPlayerProps, AudioPlayerSizeType, AudioPlayerAdvancedControl } from './types';
import { ScreenRecordingMode } from '../screen-recording/constants';
import { UniButton } from '../button/UniButton';


// Dummy data from Vue story
const dummyAnnotations = (): any[] => [
    {
        annotationId: '111',
        header: 'Annotation',
        text: 'Annotation Message',
        offsetInSeconds: 6,
        timestamp: '2020-01-01T00:00:00.000Z',
        participantId: 'auth0|65d8ddd0bb9c54c9680253f5',
        productType: 'PRODUCT_TYPE_U_CAPTURE',
    },
];

const meta = {
    title: 'UNI-COMPONENTS/AudioPlayer',
    component: UniAudioPlayer,
    tags: ['autodocs'],
    argTypes: {
        isMediaLoading: { control: 'boolean', description: 'Whether the media is currently loading.' },
        audioSrc: { control: 'text', description: 'URL of the audio file.' },
        expandDisabled: { control: 'boolean', description: 'Whether the expand button is disabled.' },
        currentTime: { control: 'number', description: 'Current playback time in seconds.' },
        aDuration: { control: 'number', description: 'Total duration of the audio in seconds.' },
        annotations: { control: 'object', description: 'Array of annotations for the audio.' },
        isStream: { control: 'boolean', description: 'Whether the audio is a live stream.' },
        peaks: { control: 'object', description: 'Array of waveform peaks.' },
        agentFullName: { control: 'text', description: 'Full name of the agent associated with the audio.' },
        defaultScreenRecordingMode: {
            control: 'select',
            options: [
                ScreenRecordingMode.FullScreen,
                ScreenRecordingMode.PIP,
                ScreenRecordingMode.Preview,
                ScreenRecordingMode.Theatre,
            ],
            description: 'Mode for screen recording video player.',
        },
        screenRecordingLink: { control: 'text', description: 'Href of the screen recording (if applicable).' },
        defaultPlayer: {
            control: 'select',
            options: [AudioPlayerSizeType.mini, AudioPlayerSizeType.expanded],
            description: 'Whether the player is expanded or mini on first load.',
        },
        defaultShowScreenRecording: {
            control: 'boolean',
            description: 'Whether to show the screen recording video player on first load.',
        },
        defaultShowTopBanner: { control: 'boolean', description: 'Whether to show the top banner on first load.' },
        advancedControls: {
            control: 'multi-select',
            options: [
                AudioPlayerAdvancedControl.annotations,
                AudioPlayerAdvancedControl.screenRec,
                AudioPlayerAdvancedControl.toggleSize,
                AudioPlayerAdvancedControl.settings
            ],
            description: 'The available buttons on the right hand side of the player.',
        },
        theatreVideoEl: { control: 'object', description: 'HTMLVideoElement for theatre mode.' },
    },
    args: {
        audioSrc: 'https://cdn.freesound.org/previews/63/63897_216886-lq.mp3',
        isMediaLoading: false,
        expandDisabled: false,
        currentTime: 0,
        aDuration: 0,
        annotations: dummyAnnotations(),
        isStream: false,
        agentFullName: 'John Doe',
        defaultScreenRecordingMode: ScreenRecordingMode.Preview,
        screenRecordingLink: 'https://cdn.pixabay.com/video/2025/04/09/270940_large.mp4',
        defaultPlayer: AudioPlayerSizeType.expanded,
        defaultShowScreenRecording: true,
        defaultShowTopBanner: true,
        theatreVideoEl: null,
        advancedControls: [
            AudioPlayerAdvancedControl.annotations,
            AudioPlayerAdvancedControl.screenRec,
            AudioPlayerAdvancedControl.toggleSize,
            AudioPlayerAdvancedControl.settings
        ],
    },
    parameters: {
        theme: ANT_THEME_TOKEN,
    },
} satisfies Meta<typeof UniAudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

const PrimaryTemplate = (args: UniAudioPlayerProps) => {
    const [audioSrc, setAudioSrc] = useState(args.audioSrc);
    const [screenRecordingLink, setScreenRecordingLink] = useState(args.screenRecordingLink);
    const [advancedControls, setAdvancedControls] = useState(args.advancedControls);
    const [annotations, setAnnotations] = useState(args.annotations);
    const [isStream, setIsStream] = useState(args.isStream);
    const [isExpanded, setIsExpanded] = useState(args.defaultPlayer === AudioPlayerSizeType.expanded);
    const [aDuration, setADuration] = useState(args.aDuration);

    const changeToAudioOne = () => {
        setAudioSrc('https://cdn.freesound.org/previews/63/63897_216886-lq.mp3');
        setScreenRecordingLink('https://cdn.pixabay.com/video/2025/04/09/270940_large.mp4');
        setAdvancedControls(args.advancedControls);
        setAnnotations(dummyAnnotations());
        setIsStream(false);
    };

    const changeToAudioTwo = () => {
        setAudioSrc('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
        setScreenRecordingLink(undefined);
        setAdvancedControls([AudioPlayerAdvancedControl.toggleSize]);
        setAnnotations([]);
        setIsStream(false);
    };

    const changeToStream = () => {
        setAudioSrc('https://cdn.freesound.org/previews/63/63897_216886-lq.mp3');
        setScreenRecordingLink(undefined);
        setAdvancedControls([AudioPlayerAdvancedControl.toggleSize]);
        setAnnotations([]);
        setIsStream(true);
    };

    return (
        <ConfigProvider theme={ANT_THEME_TOKEN}>
            <div className="mb-2">
                <UniButton className="m-1" onClick={changeToAudioOne}>Audio 1 - Screen Recording & Annotations</UniButton>
                <UniButton className="m-1" onClick={changeToAudioTwo}>Audio 2 - no Screen Recording/Annotations</UniButton>
                <UniButton className="m-1" onClick={changeToStream}>Audio 3 - Stream</UniButton>
            </div>
            <div className={!isExpanded ? 'w-[475px]' : 'h-[169px] w-full'}>
                <UniAudioPlayer
                    {...args}
                    className="w-full"
                    audioSrc={audioSrc}
                    screenRecordingLink={screenRecordingLink}
                    advancedControls={advancedControls}
                    annotations={annotations}
                    isStream={isStream}
                    aDuration={aDuration}
                    onToggleExpanded={setIsExpanded}
                    onDurationChange={setADuration}
                />
            </div>
        </ConfigProvider>
    );
};



export const Primary: Story = {
    render: (args) => <PrimaryTemplate {...args} />
};
