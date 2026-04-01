import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import classNames from 'classnames';
import * as echarts from 'echarts';

import './UniEChart.scss';

const DEFAULT_CHART_HEIGHT = 320;

export type UniEChartInstance = ReturnType<typeof echarts.init>;
export type UniEChartOption = Parameters<UniEChartInstance['setOption']>[0];
export type UniEChartSetOptionConfig = Parameters<UniEChartInstance['setOption']>[1];
export type UniEChartInitOptions = Parameters<typeof echarts.init>[2];
export type UniEChartTheme = Parameters<typeof echarts.init>[1];
type UniEChartEventHandler = (params?: unknown) => void;

export type UniEChartEvents = Record<string, UniEChartEventHandler | undefined>;

export type UniEChartProps = {
  option: UniEChartOption;
  className?: string;
  style?: CSSProperties;
  theme?: UniEChartTheme;
  initOptions?: UniEChartInitOptions;
  setOptionConfig?: UniEChartSetOptionConfig;
  loading?: boolean;
  loadingOption?: object;
  autoResize?: boolean;
  onEvents?: UniEChartEvents;
  onChartReady?: (instance: UniEChartInstance) => void;
};

export type UniEChartRef = {
  getInstance: () => UniEChartInstance | null;
  resize: () => void;
};

export const UniEChart = forwardRef<UniEChartRef, UniEChartProps>(
  (
    {
      option,
      className,
      style,
      theme,
      initOptions,
      setOptionConfig,
      loading = false,
      loadingOption,
      autoResize = true,
      onEvents,
      onChartReady,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<UniEChartInstance | null>(null);
    const registeredEventsRef = useRef<Array<[string, UniEChartEventHandler]>>([]);
    const onChartReadyRef = useRef(onChartReady);

    useEffect(() => {
      onChartReadyRef.current = onChartReady;
    }, [onChartReady]);

    useImperativeHandle(
      ref,
      () => ({
        getInstance: () => chartRef.current,
        resize: () => {
          chartRef.current?.resize();
        },
      }),
      []
    );

    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const chart = echarts.init(containerRef.current, theme, initOptions);
      chartRef.current = chart;
      onChartReadyRef.current?.(chart);

      return () => {
        registeredEventsRef.current.forEach(([eventName, handler]) => {
          chart.off(eventName, handler);
        });
        registeredEventsRef.current = [];

        chart.dispose();
        chartRef.current = null;
      };
    }, [theme, initOptions]);

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }

      chartRef.current.setOption(option, setOptionConfig);
    }, [option, setOptionConfig]);

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }

      if (loading) {
        chartRef.current.showLoading('default', loadingOption);
        return;
      }

      chartRef.current.hideLoading();
    }, [loading, loadingOption]);

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }

      registeredEventsRef.current.forEach(([eventName, handler]) => {
        chartRef.current?.off(eventName, handler);
      });
      registeredEventsRef.current = [];

      if (!onEvents) {
        return;
      }

      Object.entries(onEvents).forEach(([eventName, handler]) => {
        if (typeof handler !== 'function') {
          return;
        }

        chartRef.current?.on(eventName, handler);
        registeredEventsRef.current.push([eventName, handler]);
      });
    }, [onEvents]);

    useEffect(() => {
      if (!autoResize || !containerRef.current) {
        return;
      }

      const resize = () => chartRef.current?.resize();

      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => resize());
        observer.observe(containerRef.current);
        return () => observer.disconnect();
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
      }
    }, [autoResize]);

    const mergedStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: DEFAULT_CHART_HEIGHT, ...style }), [style]);

    return <div ref={containerRef} className={classNames('uni-echart', className)} style={mergedStyle} />;
  }
);

UniEChart.displayName = 'UniEChart';
