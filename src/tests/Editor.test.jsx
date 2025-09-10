import { render } from '@testing-library/react'
import EditorCanvas from '../components/editor/EditorCanvas'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: () => {},
  useThree: () => ({ camera: {}, size: { width: 100, height: 100 } }),
}))

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div />,
  Html: ({ children }) => <div>{children}</div>,
}))

test('renders EditorCanvas without crashing', () => {
  const { getByTestId } = render(<EditorCanvas modelUrl={null} />)
  expect(getByTestId('canvas')).toBeTruthy()
})