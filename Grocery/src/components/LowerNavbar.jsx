import { Disclosure, Menu, MenuButton } from '@headlessui/react'

const LowerNavbar = [
  { name: 'FRUITS & VEGETABLES', href: '#' },
  { name: 'DAIRY & BAKERY', href: '#' },
  { name: 'BEVERAGES', href: '#' },
  { name: 'SNACKS', href: '#' },
  { name: 'SPICES & CONDIMENTS', href: '#' },
  { name: 'HOUSEHOLD ESSENTIALS', href: '#' },
  { name: 'PERSONAL CARE', href: '#' },
  { name: 'GRAINS & PULSES', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          <div className="flex space-x-4">
            {LowerNavbar.map((item) => (
              <Menu as="div" className="relative" key={item.name}>
                <div>
                  <MenuButton className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    {item.name}
                  </MenuButton>
                </div>
                <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Fresh Produce
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Organic Products
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Weekly Deals
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ))}
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
