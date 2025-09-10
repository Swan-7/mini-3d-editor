import { render } from '@testing-library/react'
import Topbar from '../components/ui/Topbar'


describe('Topbar', () => {
    it('renders the import button', () => {
        const { getByText } = render(<Topbar onFile={() => {}} />)
        expect(getByText(/Import .glb/i)).toBeTruthy()
    })
})
